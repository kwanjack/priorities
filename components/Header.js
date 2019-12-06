import { useRouter } from 'next/router';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faHome, faPencilAlt, faList, faInfo } from '@fortawesome/free-solid-svg-icons'


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
    margin: 0px;
    align-items: center;
    justify-content: center;
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
`}</style>

const Header = () => {
  const router = useRouter();

  const headerButtons = [
    { name: 'Home', onClick: () => router.push('/'), icon: <FontAwesomeIcon icon={faHome} />, color: "#50c4e8" },
    { name: 'Add Task', onClick: () => router.push('/addTask'), icon: <FontAwesomeIcon icon={faPencilAlt} />, color: "#6ee93c"},
    { name: 'Add Priority', onClick: () => router.push('/addPriority'), icon: <FontAwesomeIcon icon={faExclamation} />, color: "#e93732" },
    { name: 'Priorities', onClick: () => router.push('/priorities'), icon: <FontAwesomeIcon icon={faList} />, color: "#684aef"},
    { name: 'About', onClick: () => router.push('/about'), icon: <FontAwesomeIcon icon={faInfo} />, color: "grey"},
  ];

  return <div className="header">
    { headerStyle }
    { headerButtons.map((data, i) => <button className="button"  key={i} onClick={data.onClick}>
    <div className="button-left" style={{ backgroundColor: data.color }}>
        { data.icon }
      </div>
      <div className="button-name"> {data.name} </div>
      {buttonStyle}
      </button>) }
  </div>
};

export default Header;