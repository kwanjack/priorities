import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const trapezoidStyle = <style jsx={"true"}>{`
  .trapezoid {
    border-style: solid;
    height: 0;
    width: 50vw;
    border-color: blue transparent red transparent;
    background: pink;
    border-width: 0 0 100px 100px;
  }
`}</style>

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
    <div className="trapezoid"> </div>
    {trapezoidStyle}
  </div>
);

export default Layout;