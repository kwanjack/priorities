import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';

import { usePriorities } from '../hooks/customHooks';


const PrioritiesPage = () => {
  const router = useRouter();

  let priorities = usePriorities() || [];
  
  return (
    <Layout>
      <h1>Priorities</h1> 
      <ul>
        {priorities.map(priority => <li key={priority.id}>{priority.name}</li>)}
      </ul>
    </Layout>
  );
};

export default PrioritiesPage;