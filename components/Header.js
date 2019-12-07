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
  }

  .add-submit {
    width: 20%;
    height: 96px;
    margin: 0px;
    padding: 0px;
    font-size:50px;
  }
`}</style>

const Header = () => {
  const router = useRouter();

  const headerButtons = [
    // { name: 'Home', onClick: () => router.push('/'), icon: <FontAwesomeIcon icon={faHome} />, color: "#50c4e8" },
    // { name: 'Add Task', onClick: () => router.push('/addTask'), icon: <FontAwesomeIcon icon={faPencilAlt} />, color: "#6ee93c"},
    // { name: 'Add Priority', onClick: () => router.push('/addPriority'), icon: <FontAwesomeIcon icon={faExclamation} />, color: "#e93732" },
    // { name: 'Priorities', onClick: () => router.push('/priorities'), icon: <FontAwesomeIcon icon={faList} />, color: "#684aef"},
    // { name: 'About', onClick: () => router.push('/about'), icon: <FontAwesomeIcon icon={faInfo} />, color: "grey"},
  ];
  
  let popupButton = (label, color, icon) => <button className="button"  key={'blah'}>
    <div className="button-left" style={{ backgroundColor: color }}> <FontAwesomeIcon icon={icon} /> </div>
    <div className="button-name"> {label} </div>
    {buttonStyle}
  </button>;


  let [ taskName, setTaskName ] = useState('');
  let [ priorityName, setPriorityName ] = useState('');
  
  let addTask = () => { addTaskByName( taskName ); close() };

  return <div className="header">
    { headerButtons.map((data, i) => <button className="button"  key={i} onClick={data.onClick}>
    <div className="button-left" style={{ backgroundColor: data.color }}>
        { data.icon }
      </div>
      <div className="button-name"> {data.name} </div>
      {buttonStyle}
      </button>)
    }

    <Popup trigger={popupButton('Add Task', "#6ee93c", faPencilAlt)} modal closeOnDocumentClick
      contentStyle={{ padding: "0px", border: "none" }}>
      {close => (
        <div className="modal">
          <input className="add-input" type="text" placeholder="Add Task" onChange={(event) => { setTaskName(event.target.value)} } value={taskName} />
          <button className="add-submit" onClick={() => { addTaskByName( taskName ); close() }}> <FontAwesomeIcon icon={faPencilAlt} /> </button>
        </div>
      )}
    </Popup>
    <Popup trigger={popupButton('Add Priority', "#50c4e8", faExclamation)} modal closeOnDocumentClick>
      {close => (
        <div className="modal">
          <h1>Add Priority</h1> 
          <input type="text" onChange={(event) => { setPriorityName(event.target.value)} } value={priorityName} />
          <button onClick={() => { addPriorityByName( priorityName ); close() }}> Add </button>
        </div>
      )}
    </Popup>
    <div className="spacer"></div>
    { headerStyle }
  </div>
};

export default Header;