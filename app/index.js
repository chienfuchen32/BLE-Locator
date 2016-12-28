// import React from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

import Locator from './Locator';

export default class MenuExampleSecondaryPointing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' }
  }
  handleItemClick(name){ 
    this.setState({ activeItem: name })
  }
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick.bind(this, 'home')} />
          <Menu.Item name='setup' active={activeItem === 'setup'} onClick={this.handleItemClick.bind(this, 'setup')} />
          <Menu.Menu position='right'>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick.bind(this, 'logout')} />
          </Menu.Menu>
        </Menu>
        <Locator />
      </div>
    )
  }
}
ReactDOM.render(
  <MenuExampleSecondaryPointing />,
  document.getElementById('div_main')
);