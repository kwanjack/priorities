/*
Task {
	id: String
	name: String
}

Priority {
	id: String
	name: String
	ranking: [ TaskIds ]
}
*/

import PubSub from 'pubsub-js';
import { dummyTasks, dummyPriorities } from './dummyData';

function generateId() { return '_' + Math.random().toString(36).substr(2, 9); }

export function getTasks() {
  let tasksJSON = localStorage.getItem('tasks');
  if (!tasksJSON) {
    localStorage.setItem('tasks', JSON.stringify(dummyTasks));
    localStorage.setItem('priorities', JSON.stringify(dummyPriorities));
    tasksJSON = localStorage.getItem('tasks');
    PubSub.publish('tasks', JSON.parse(tasksJSON));
  }
  return JSON.parse(tasksJSON);
}

export function getPriorities() {
  let priortiesJSON = localStorage.getItem('priorities');
  if (!priortiesJSON) {
    localStorage.setItem('tasks', JSON.stringify(dummyTasks));
    localStorage.setItem('priorities', JSON.stringify(dummyPriorities));
    priortiesJSON = localStorage.getItem('priorities');
    PubSub.publish('priorities', JSON.parse(priortiesJSON));
  }
  return JSON.parse(priortiesJSON);
}


export function addTaskByName(taskName) {
  let tasks = getTasks();
  let task = { id: generateId(), name: taskName };
  tasks.push(task);

  let priorities = getPriorities();

  for (let priority of priorities) {
    priority.ranking.unshift(task.id);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('priorities', JSON.stringify(priorities));
  PubSub.publish('tasks', tasks);
  PubSub.publish('priorities', priorities);
  return tasks;
}

export function removeTaskById(taskId) {
  let tasks = getTasks();
  let priorities = getPriorities();

  let newTasks = tasks.filter(task => task.id !== taskId);
  let newPriorities = priorities.map(priority =>  ({ ...priority, ranking: priority.ranking.filter(id => id !== taskId) }));
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  localStorage.setItem('priorities', JSON.stringify(newPriorities));
  PubSub.publish('tasks', newTasks);
  PubSub.publish('priorities', newPriorities);
}

export function addPriorityByName(priorityName) {
  let priorities = getPriorities();
  let tasks = getTasks();

  let priority = {
    id: generateId(),
    name: priorityName,
    ranking: tasks.map(task => task.id)
  };

  priorities.push(priority);
  localStorage.setItem('priorities', JSON.stringify(priorities));
  PubSub.publish('priorities', priorities);
  return priority;
}

export function removePriorityById(priorityId) {
  let priorities = getPriorities();
  priorities = priorities.filter(p => p.id !== priorityId);

  localStorage.setItem('priorities', JSON.stringify(priorities));
  PubSub.publish('priorities', priorities);
  return priorities;
}

export function moveTaskToRank(taskId, priorityId, position) {
  let priorities = getPriorities();
  let tasks = getTasks();

  let priorityIdx = priorities.findIndex(priority => priority.id === priorityId);
  let priority = priorities[priorityIdx];
  let ranking = priority.ranking.slice();

  let withoutItem = ranking.filter( item => item !== taskId);
  
  let newRanking = [...withoutItem.slice(0,position), taskId, ...withoutItem.slice(position)];

  let newPriority = {
    ...priority,
    ranking: newRanking,
  };

  priorities[priorityIdx] = newPriority;
  localStorage.setItem('priorities', JSON.stringify(priorities));
  PubSub.publish('priorities', priorities);
}