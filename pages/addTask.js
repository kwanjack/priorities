import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';
import { addTaskByName } from '../mock_api/models';
import { useState } from 'react';

const addTaskPage = () => {
  const router = useRouter();
  let [ taskName, setTaskName ] = useState('');

  let addTask = () => {
    addTaskByName( taskName );
    router.push('/');
  };

  return (
    <Layout>
      <h1>Add Task</h1> 
      <input type="text" onChange={(event) => { setTaskName(event.target.value)} } value={taskName} />
      <button onClick={addTask}> Click to add task </button>
    </Layout>
  );
};

export default addTaskPage;