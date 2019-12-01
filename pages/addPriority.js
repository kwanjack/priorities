import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';
import { useState } from 'react';
import { addPriorityByName } from '../mock_api/models';

const AddPriorityPage = () => {
  const router = useRouter();
  let [ priorityName, setPriorityName ] = useState('')

  let addPriorities = () => {
    addPriorityByName( priorityName );
    router.push('/');
  };

  return (
    <Layout>
      <h1>Add Priority</h1> 
      <input type="text" onChange={(event) => { setPriorityName(event.target.value)} } value={priorityName} />
      <button onClick={addPriorities}> Click to add task </button>
    </Layout>
  );
};

export default AddPriorityPage;