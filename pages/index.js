import Layout from '../components/MyLayout';
import Link from 'next/link';
import { useTasks, usePriorities } from '../hooks/customHooks';

import { moveTaskToRank, removeTaskById, removePriorityById } from '../mock_api/models'
import { useState } from 'react';

import { List, arrayMove } from 'react-movable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTrash } from '@fortawesome/free-solid-svg-icons';

import Select from 'react-select';

export default function Home() {

  let tasks = useTasks(); // existing hook
  let priorities = usePriorities() || [];

  let [pickedPriorityId, setPickedPriorityId] = useState('0');

  let selectStyle = <style jsx="true">{`
    .select-wrapper {
      position: absolute;
      display: flex;
      flex-direction: row;
      width: 500px;
      height: 100px;
      right: 0;
      top: 70px;
      align-items: center;
    }

    .select {
      flex: 1
    }

    .select-label {
      display: flex;
      height: 54px;
      width: 100px;
      padding: 0px;
      margin: 0px;
      background-color: #6d695f;
      font-size: 20px;
      font-weight: 700;
      align-items: center;
      justify-content: center;
    }

    .remove-priority:hover {
      color: red;
    }

    .priority-option {
      display: flex;
      align-content: space-between;
    }

    .option-container {
      display: flex;
    }

  `}</style>;


  let customStyles = {      
    control: (base, state) => ({
      ...base,
      background: "#f0bb39",
      border: state.isFocused ? 0 : 0,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': { border: state.isFocused ? 0 : 0 },
      height: '54px',
      'min-height': '54px',
      'border-radius': '0px',
      fontFamily: "Arial",
      fontSize: '20px',
      'font-weight': 700,
    }),
    singleValue: (provided, state) => {
      return { ...provided, fontWeight: 900, color: 'black' };
    }
  };

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div className="option-container">
      <div>{label}</div>
      <div className="priority-option">
        {customAbbreviation} 
        <div className="remove-priority" onClick={((e) => {
          e.stopPropagation();
          let newPriorities = removePriorityById(value);
          if (newPriorities.length === 0) { return setPickedPriorityId(null); }
          if (newPriorities.findIndex(p => p.id === pickedPriorityId) === -1) { setPickedPriorityId(newPriorities[0].id); }
        })}> <FontAwesomeIcon icon={faTrash} /> </div>
      </div>
    </div>
  );

  let renderPriorityOptions = (priorities) => {
    let options = [];
    for (let priority of priorities) { options.push({ value: priority.id,  label: priority.name }) }
    let picked = options.find(option => option.value === pickedPriorityId) || null;
    return <div className="select-wrapper">
      <div className="select-label"> Sort by: </div>
      <Select className="select" instanceId="selectPriority"
        value={picked}
        onChange={(selected) => setPickedPriorityId(selected.value)}
        formatOptionLabel={formatOptionLabel}
        options={options}
        components={{ IndicatorSeparator: () => null }}
        styles={customStyles}
      />
      {selectStyle}
    </div>;
  };


  let sortTasksUsingPriority = (pickedPriorityId, tasks) => {
    if (!pickedPriorityId) { return []; }
    if (priorities.length === 0) { return []; }

    let result = [];
    let priority = priorities.find(priority => priority.id === pickedPriorityId);
    if (!priority ) { return []; }
    for (let i = 0; i < priority.ranking.length; i++) {
      let ranking = priority.ranking[i];
      let task = tasks.find(task => task.id === ranking);
      result.push(task);
    };
  
    result = result.filter(item => item !== undefined); 
    return result;
  };

  let sortedTasks = sortTasksUsingPriority(pickedPriorityId, tasks);

  let triggerMovement = () => {
    let lastTask = sortedTasks[tasks.length-1];
    moveTaskToRank(lastTask.id, pickedPriorityId, 1);
  }

  let listStyle = <style jsx="true">{`
    .draggable-list {
      margin-top: 80px;
      overflow: auto;
      max-height: -webkit-calc(100vh - 180px);
      -webkit-mask-image: -webkit-gradient(linear, left center, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
    }

    .draggable-left {
      background: lightgrey;
      width: 30px;
      padding: 0px;
      margin: 0px;
      height: 100%;
    }

    .list-item-content {
      display: flex;
      flex-direction: row;
      height: 40px;
      align-items: center;
      font-weight: 700;
    }

    ul {
      padding: 0px;
    }

    li:hover {
      cursor: move; /* fallback if grab cursor is unsupported */
      cursor: grab;
    }

    li {
      display: flex;
      margin: 10px 0px;
      background-color: white;
      list-style-type: none;
      font-size: 20px;
      height: 40px;
      width: 400px;
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

  let renderTestList = (tasks) => {
    let items = sortTasksUsingPriority(pickedPriorityId, tasks).map(st => st.name);
    return (
      <List 
        values={items}
        removableByMove={true}
        onChange={({ oldIndex, newIndex }) => {
            if (newIndex === -1) { return removeTaskById(sortedTasks[oldIndex].id); }
            moveTaskToRank(sortedTasks[oldIndex].id, pickedPriorityId, ''+newIndex);
          }
        }
        renderList={({ children, props }) => <ul className="draggable-list" {...props}>{children}</ul>}
        renderItem={({ value, props }) => <li className="list-item" {...props}>
          <div className="list-item-content">
            <div className="draggable-left"></div>
            <div className="list-item-name"> {value} </div>
          </div>
        </li>}>
      </List>
    );
  }

  return (
    <Layout onAddPriority={setPickedPriorityId}>
      <div className="main-content">
        <h1 className="main-title"> <FontAwesomeIcon icon={faList} /> Priorities</h1>
        <h2 className="sub-title"> Pokemon Sword/Shield Themed Task Organizer.</h2>
        { renderPriorityOptions(priorities) } 
        { renderTestList(tasks) }
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