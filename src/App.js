import React from 'react';
import './App.css';
import Toolbar from './component/Toolbar/Toolbar';
import SideDrawer from './component/SideDrawer/Sidedrawer';
import Backdrop from './component/Backdrop/Backdrop';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Users } from './pages/Users';


class App extends React.Component {
  state = {
    SideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {
        SideDrawerOpen: !prevState.SideDrawerOpen,
      }
    });
  };

  backdropClickHandler = () => {
    this.setState({
      SideDrawerOpen: false,
    });
  }
  render() {
    let backdrop;
    if (this.state.SideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}></Backdrop>;
    }

    return (
      <div style={{ height: '100%' }}>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler}></Toolbar>
        <SideDrawer show={this.state.SideDrawerOpen}></SideDrawer>
        {backdrop}
        <Router>
          <Switch>
            <Route exact path="/" component={Users} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
