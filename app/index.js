// import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

import Locator from './Locator';
import Map_Setup from './Map_Setup';
import BLE_List from './BLE_List';
import Account from './Account';
import Login from './Login';
import Logout from './Logout';

export default class MenuExampleSecondaryPointing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'ble list'
    }
  }
  itemOnClickHandler(name){
    this.setState({ activeItem: name })
  }
  render() {
    let main = null;
    switch (this.state.activeItem){
      case "ble locator":
          main = <Locator />
          break;
        case "map setup":
          main = <Map_Setup />
          break;
        case "ble list":
          main = <BLE_List />
          break;
        case "account":
          main = <Account />
          break;
        case "login":
          main = <Login />
          break;
        case "logout":
          main = <Logout />
          break;
        default:
          main = <Locator />
          break;
    }
    return (
      <div>
        <Menu pointing secondary color={'blue'} size='large'>
          <Menu.Item name='BLE locator' active={this.state.activeItem === 'ble locator'} onClick={this.itemOnClickHandler.bind(this, 'ble locator')} />
          <Menu.Item name='map setup' active={this.state.activeItem === 'map setup'} onClick={this.itemOnClickHandler.bind(this, 'map setup')} />
          <Menu.Item name='BLE list' active={this.state.activeItem === 'ble list'} onClick={this.itemOnClickHandler.bind(this, 'ble list')} />
          {/*<Menu.Menu position='right'>
            <Menu.Item name='account' active={this.state.activeItem === 'account'} onClick={this.itemOnClickHandler.bind(this, 'account')} />
            <Menu.Item name='login' active={this.state.activeItem === 'login'} onClick={this.itemOnClickHandler.bind(this, 'login')} />
            <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={this.itemOnClickHandler.bind(this, 'logout')} />
          </Menu.Menu>*/}
        </Menu>
        {main}
      </div>
    )
  }
}
ReactDOM.render(
  <MenuExampleSecondaryPointing />,
  document.getElementById('div_main')
);