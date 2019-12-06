import Layout from '../components/MyLayout';
import Link from 'next/link';
import { useTasks, usePriorities } from '../hooks/customHooks';

import { moveTaskToRank } from '../mock_api/models'
import { useState } from 'react';

import { List, arrayMove } from 'react-movable';

export default function Home() {

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
  
    result = result.filter(item => item !== undefined ); 
    return result;
  };

  let sortedTasks = sortTasksUsingPriority(pickedPriorityId, tasks);

  let triggerMovement = () => {
    let lastTask = sortedTasks[tasks.length-1];
    moveTaskToRank(lastTask.id, pickedPriorityId, 1);
  }

  let renderTestList = () => {

    let items = sortedTasks.map(st => st.name);
    // let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
    return (
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) => {
          console.log('old:', oldIndex, 'new:', newIndex);
            moveTaskToRank(sortedTasks[oldIndex].id, pickedPriorityId, ''+newIndex);
            {/* this.setState(prevState => ({
              items: arrayMove(prevState.items, oldIndex, newIndex)
            })) */}
          }
        }
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li {...props}>{value}</li>}
      />
    );
  }

  return (
    <Layout>
      <h1>Home</h1>
      { renderPriorityOptions(priorities) } 

      <ul>
        {renderTestList()}
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