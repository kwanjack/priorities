import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';
import { addTaskByName } from '../mock_api/models';

const Page = () => {
  const router = useRouter();

  let addDummyTask = () => {
    addTaskByName('Blah' + parseInt(Math.random() * 100));
    router.push('/');
  };

  return (
    <Layout>
      <h1>Add Task</h1> 
      <button onClick={addDummyTask}> Click to add dumb task </button>
    </Layout>
  );
};

export default Page;