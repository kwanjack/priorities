import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/addTask">
      <a style={linkStyle}>Add Task</a>
    </Link>
    <Link href="/addPriority">
      <a style={linkStyle}>Add Priority</a>
    </Link>
    <Link href="/priorities">
      <a style={linkStyle}>Priorities</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
);

export default Header;