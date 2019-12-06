import Layout from '../components/MyLayout';
import Link from 'next/link';
import { useTasks, usePriorities } from '../hooks/customHooks';

import { moveTaskToRank } from '../mock_api/models'
import { useState } from 'react';

import { List, arrayMove } from 'react-movable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

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

  let listStyle = <style jsx="true" global>{`
    .draggable-left {
      background: grey;
      width: 40px;
      height: 100%;
      padding: 0px;
      margin: 0px;
    }

    ul {
      padding: 0px;
    }

    li {
      display: flex;
      margin: 10px 0px;
      background-color: white;
      list-style-type: none;
      font-size: 20px;
      height: 40px;
      width: 400px;
      font-weight: 400;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
    }

    .list-item-name {
      text-align: left;
      padding-left: 10px;
      flex: 1;
    }
  `}</style>;

  let renderTestList = () => {

    let items = sortedTasks.map(st => st.name);
    // let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];


    return (
      <List className="draggable-list"
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
        renderItem={({ value, props }) => <li className="list-item" {...props}>
          <div className="draggable-left"></div>
          <div className="list-item-name"> {value} </div>
        </li>}
      >
      </List>
    );
  }

  return (
    <Layout>

      <div className="main-content">
        <h1 className="main-title"> <FontAwesomeIcon icon={faList} /> Priorities</h1>
        <h2 className="sub-title"> Pokemon Sword/Shield Themed Task Organizer.</h2>
        { renderPriorityOptions(priorities) } 
        <ul> {renderTestList()} </ul>
      </div>
      <style jsx>{`
        h1 { font-size: 40px; }
        
        .main-title { margin-bottom: 0; }
        .sub-title { margin-top: 0; font-size: 12px; }
        .main-content { padding-left: 20px; }
      `}</style>
      {listStyle}
    </Layout>
  );
}