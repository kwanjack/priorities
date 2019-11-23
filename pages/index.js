import Layout from '../components/MyLayout';
import Link from 'next/link';
import { useTasks } from '../hooks/customHooks';

export default function Home() {

  let tasks = useTasks();
  console.log('tasks:', tasks);
  return (
    <Layout>
      <h1>Home</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}> {task.name} </li>
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
}