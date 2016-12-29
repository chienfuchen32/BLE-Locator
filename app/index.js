// import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

import Locator from './Locator';
import Setup from './Setup';

export default class MenuExampleSecondaryPointing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home' 
    }
  }
  handleItemClick(name){ 
    this.setState({ activeItem: name })
  }
  render() {
    let main = null;
    switch (this.state.activeItem){
      case "home":
          main = <Locator />
          break;
        case "map setup":
          main = <Setup />
          break;
        case "ble list":
          main = <Setup />
          break;
        case "account":
          main = <Setup />
          break;
        default:
          main = <Locator />
          break;
    }
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleItemClick.bind(this, 'home')} />
          <Menu.Item name='map setup' active={this.state.activeItem === 'map setup'} onClick={this.handleItemClick.bind(this, 'map setup')} />
          <Menu.Item name='BLE list' active={this.state.activeItem === 'ble list'} onClick={this.handleItemClick.bind(this, 'ble list')} />
          <Menu.Menu position='right'>
            <Menu.Item name='account' active={this.state.activeItem === 'account'} onClick={this.handleItemClick.bind(this, 'account')} />
            <Menu.Item name='logout' active={this.state.activeItem === 'logout'} onClick={this.handleItemClick.bind(this, 'logout')} />
          </Menu.Menu>
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