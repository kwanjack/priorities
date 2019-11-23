import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import { getTasks } from '../mock_api/models';


export function useTasks(friendID) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log('Setting initial Tasks...');
    let initialTasks = getTasks();
    setTasks(initialTasks);
  }, []);

  useEffect(() => {
    var token = PubSub.subscribe('tasks', (msg, data) => {
      console.log(msg, data);
      setTasks(data);
    });

    return () => {
      PubSub.unsubscribe(token);
    };
  });

  return tasks;
}