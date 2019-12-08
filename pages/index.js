import { useTasks, usePriorities } from '../hooks/customHooks';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import PrioritySelect from '../components/PrioritySelect';
import TaskList from '../components/TaskList';
import Layout from '../components/Layout';

let homeStyle =  <style jsx="true">{`
h1 { font-size: 40px; }
.main-title { margin-bottom: 0; }
.sub-title { margin-top: 0; font-size: 12px; }
.main-content {
  padding-left: 20px;
  width: -webkit-calc(100vw - 50px);
 }
`}</style>;

export default function Home() {
  let tasks = useTasks();
  let priorities = usePriorities() || [];
  let [pickedPriorityId, setPickedPriorityId] = useState('0');

  return (
    <Layout onAddPriority={setPickedPriorityId}>
      <div className="main-content">
        <h1 className="main-title"> <FontAwesomeIcon icon={faList} /> Priorities</h1>
        <h2 className="sub-title"> Pokemon Sword/Shield Themed Task Organizer.</h2>
        <PrioritySelect priorities={priorities}
          pickedPriorityId={pickedPriorityId}
          setPickedPriorityId={setPickedPriorityId} />
        
        <TaskList tasks={tasks} priorities={priorities}
          pickedPriorityId={pickedPriorityId}
         />
      </div>
     {homeStyle}
    </Layout>
  );
}