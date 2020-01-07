import React from "react";
import ReactDOM from "react-dom";
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

const App = () => {
  return <div>Hello React,Webpack 4 & Babel 7!</div>;
};

ReactDOM.render(<AppRouter />, document.querySelector("#root"));