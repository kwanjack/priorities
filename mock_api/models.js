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
  let task = { id: `${tasks.length}`, name: taskName };
  tasks.push(task);
  PubSub.publish('tasks', tasks);

  let priorities = getPriorities();

  for (let priority of priorities) {
    priority.ranking.push(task.id);
  }

  console.log('ah:', tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('priorities', JSON.stringify(priorities));
  return tasks;
}

export function addPriorityByName(priorityName) {
  let priorities = getPriorities();
  let tasks = getTasks();

  let priority = {
    id: `${priorities.length}`,
    name: priorityName,
    ranking: tasks.map(task => task.id)
  };

  priorities.push(priority);
  localStorage.setItem('priorities', JSON.stringify(priorities));
  PubSub.publish('priorities', priorities);
}