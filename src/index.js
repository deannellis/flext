import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { MenuContext } from './context/menu-context';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggleMenu = () => {
      this.setState(state => ({
        menuIsOpen: !state.menuIsOpen
      }));
    };

    this.state = {
      menuIsOpen: false,
      toggleMenu: this.toggleMenu,
    }
  }
  
  render() { 
    const store = configureStore();
    return (
      <Provider store={store}>
        <MenuContext.Provider value={this.state}>
          <AppRouter toggleMenu={this.toggleMenu} />
        </MenuContext.Provider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));