import { List, arrayMove } from 'react-movable';
import { moveTaskToRank, removeTaskById } from '../mock_api/models'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  width: -webkit-calc(100% - 10px);
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  font-weight: 700;
}

ul { padding: 0px; }

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
  justify-content: space-between;
  flex-direction: row;
}

.list-item-name {
  text-align: left;
  padding-left: 10px;
  flex: 1;
}

.trash-button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  cursor: pointer;
  background: transparent;
  font-size: 20px;
  opacity: 0.5;
  transition: color 0.5s, opacity 0.5s;
}

.trash-button:hover {
  opacity: 1;
  color: red;
  transition: color 0.5s, opacity 0.5s;
}

`}</style>;

let sortTasksUsingPriority = (priorities, pickedPriorityId, tasks) => {
  if (!pickedPriorityId || priorities.length === 0) { return []; }
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


const TaskList = props => {
  let { tasks, pickedPriorityId, priorities=[]} = props;
  let sortedTasks = sortTasksUsingPriority(priorities, pickedPriorityId, tasks);
  let items = sortedTasks.map(st => st.name);  
  return (
    <List 
      values={items}
      removableByMove={true}
      onChange={({ oldIndex, newIndex, targetRect }) => {
          if (newIndex === -1) { return removeTaskById(sortedTasks[oldIndex].id); }
          moveTaskToRank(sortedTasks[oldIndex].id, pickedPriorityId, newIndex);
        }
      }
      
      renderList={({ children, props }) => <ul className="draggable-list" {...props}>{children} {listStyle}</ul>}
      renderItem={({ value, props, index }) => <li key={index} className="list-item" {...props}>
        <div className="list-item-content">
          <div className="draggable-left"></div>
          <div className="list-item-name"> {value} </div>
          <button className="trash-button" onClick={() => removeTaskById(sortedTasks[index].id) } >
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </div>
      </li>}>
    </List>
  );
};
export default TaskList;
