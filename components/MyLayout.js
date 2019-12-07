import Header from './Header';

const layoutStyle = <style jsx="true">{`
  .layout {
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: space-between;
  }
`}</style>

const trapezoidStyle = <style jsx="true">{`
  .trapezoid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`}</style>

const gradientStyle = <style jsx="true">{`
  .background {
    position: fixed;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgb(153,204,214);
    background: linear-gradient(0deg, rgba(153,204,214,1) 7%, rgba(23,247,241,0.7483368347338936) 51%, rgba(28,169,187,1) 89%);
  }
`}</style>

const containerStyle = <style jsx global>{`
  .container {
    padding: 0px;
    margin: 0px;
  }
  body {
    padding: 0px;
    margin: 0px;
    font: 11px Arial;
  }
`}</style>

const Layout = props => (
  <div className="container">
    { containerStyle }
    {gradientStyle}
    <div className="layout">
      <div className="content"> {props.children} </div>
      <Header {...props} />
      {layoutStyle}
    </div>

    <div className="background"></div>
    <svg className="trapezoid" id="trapezoid" height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path width="100%" height="100%" d="M100,0
              L100,100
              L10,100
              L60,0z" fill="#e8f62a"></path>
      {trapezoidStyle}
    </svg>
  
  </div>
  
);

export default Layout;