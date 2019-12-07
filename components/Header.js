import { useRouter } from 'next/router';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faHome, faPencilAlt, faList, faInfo } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react';
import { addTaskByName, addPriorityByName } from '../mock_api/models';


import Popup from "reactjs-popup";

const linkStyle = {
  marginRight: 15
};

const headerStyle = <style jsx="true">{`
  .header {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 50vw;
    padding: 0px;
    margin-bottom: 50px;
    margin: 0px;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .modal {
    display: flex;
    flex-direction: row;
  }
  
  .popup-content {
    border: 0px;
  }


`}</style>;

const buttonStyle = <style jsx="true">{`
  .button {
    border-radius: 100px;
    margin: 10px;
    width: 250px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    margin-right: 100px;
    font-weight: 700;
    font-size: 17px;
    border-width: 0px;
    box-shadow: 5px 5px black;
    outline:none; 
  }

  .button:active {
    position:relative;
    top:1px;
    left:1px;
    box-shadow: 0px 0px black;
  }

  .button-left {
    background: red;
    padding: 15px;
    width: 40px;
    border-radius: 100px 0px 0px 100px;
  }

  .button-name {
    flex: 1;
  }

  .spacer {
    height: 60px;
  }

  .add-input {
    height: 90px;
    width: 80%;
    font-size: 50px;
    text-indent: 10px;
  }
  .add-input:focus {
    outline: none;
  }

  .add-submit-task {
    width: 20%;
    height: 96px;
    margin: 0px;
    padding: 0px;
    font-size:50px;
    background: #6ee93c;
    border: none;
  }

  .add-submit-priority {
    width: 20%;
    height: 96px;
    margin: 0px;
    padding: 0px;
    font-size:50px;
    background: #50c4e8;
    border: none;
  }
`}</style>

const Header = () => {
  const router = useRouter();
  
  let popupButton = (label, color, icon) => <button className="button"  key={'blah'}>
    <div className="button-left" style={{ backgroundColor: color }}> <FontAwesomeIcon icon={icon} /> </div>
    <div className="button-name"> {label} </div>
    {buttonStyle}
  </button>;


  let [ taskName, setTaskName ] = useState('');
  let [ priorityName, setPriorityName ] = useState('');
  
  let addTask = (close) => { addTaskByName( taskName ); close() };
  let addPriority = (close) => { addPriorityByName( priorityName ); close() };

  return <div className="header">
    <Popup trigger={popupButton('Add Task', "#6ee93c", faPencilAlt)} modal closeOnDocumentClick contentStyle={{ padding: "0px", border: "none" }}>
      {close => (
        <div className="modal">
          <input className="add-input" type="text" placeholder="Add Task" value={taskName} onChange={event => setTaskName(event.target.value) } onKeyPress={(e) => { e.key !== 'Enter' || addTask(close) }}/>
          <button className="add-submit-task" onClick={() => addTask(close)}> <FontAwesomeIcon icon={faPencilAlt} /> </button>
        </div>
      )}
    </Popup>
    <Popup trigger={popupButton('Add Priority', "#50c4e8", faExclamation)} modal closeOnDocumentClick contentStyle={{ padding: "0px", border: "none" }}>
    {close => (
        <div className="modal">
          <input className="add-input" type="text" placeholder="Add Priority" value={priorityName} onChange={event => setPriorityName(event.target.value) } onKeyPress={(e) => { e.key !== 'Enter' || addPriority(close) }}/>
          <button className="add-submit-priority" onClick={() => addPriority(close)}> <FontAwesomeIcon icon={faExclamation} /> </button>
        </div>
      )}
    </Popup>
    <div className="spacer"></div>
    { headerStyle }
  </div>
};

export default Header;