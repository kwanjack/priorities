import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';

const AddPriorityPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>Add Priority</h1> 
      <p> Content here </p>
    </Layout>
  );
};

export default AddPriorityPage;