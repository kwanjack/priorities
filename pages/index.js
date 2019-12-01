import Layout from '../components/MyLayout';
import Link from 'next/link';
import { useTasks, usePriorities } from '../hooks/customHooks';

import { useState } from 'react';

export default function Home() {

  console.log('hi');
  let tasks = useTasks(); // existing hook
  let priorities = usePriorities() || [];

  let [pickedPriorityId, setPickedPriorityId] = useState('0');

  let renderPriorityOptions = (priorities) => {
    let options = [];
    for (let priority of priorities) {
      options.push(<option key={priority.id} value={priority.id}> {priority.name} </option>)
    }
    return <select onChange={(event) => setPickedPriorityId(event.target.value)}>
      {options}
    </select>
  };


  let sortTasksUsingPriority = (pickedPriorityId, tasks) => {
    if (priorities.length === 0) { return []; }

    let result = [];
    let priority = priorities[parseInt(pickedPriorityId)];

    for (let i = 0; i < priority.ranking.length; i++) {
      let ranking = priority.ranking;
      result.push(tasks[parseInt(ranking[i])]);
    };

    console.log('result:', result);
  
    result = result.filter(item => item !== undefined ); 
    return result;
  };

  let sortedTasks = sortTasksUsingPriority(pickedPriorityId, tasks);

  console.log('sortedTasks:', sortedTasks);
  return (
    <Layout>
      <h1>Home</h1>
      { renderPriorityOptions(priorities) } 
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id}> {task.name} </li>
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
}