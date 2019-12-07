import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { getTasks, getPriorities } from '../mock_api/models';


export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => { //on first render
    console.log('Setting initial Tasks...');
    let initialTasks = getTasks();
    setTasks(initialTasks);
  }, []);

  useEffect(() => { //on every render
    var token = PubSub.subscribe('tasks', (msg, data) => {
      console.log('publish received!');
      console.log('publish tasks:', msg, data);
      setTasks(data);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  });

  return tasks;
}

export function usePriorities() {
  const [priorities, setPriorities] = useState([]);

  useEffect(() => { //on first render
    console.log('Setting initial Priorities...');
    let initialPriorities = getPriorities();
    setPriorities(initialPriorities);
  }, []);

  useEffect(() => { //on every render
    var token = PubSub.subscribe('priorities', (msg, data) => {
      setPriorities(data);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  });

  return priorities;
}