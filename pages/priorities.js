import { useRouter } from 'next/router';
import Layout from '../components/MyLayout';

const Page = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>Priorities</h1> 
      <p> Content here </p>
    </Layout>
  );
};

export default Page;