import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import InputDrawer from '../Drawer';

class DrawerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Fundamental lines
      nibWidth: 3,
      xHeight: 5,
      aHeight: 5,
      dHeight: 5,
      cHeight: 4,
      bHeight: 0,
      iSpace: 1,
      // Verticality and pen angle
      vert: 90,
      vertSpace: 10,
      penAngle: 0,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // handleChange uses input id as state key,
  // so keep input ids consistent with state variable names

  handleChange(event) {
    const name = event.target.id;
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <InputDrawer
        {...this.state}
        handleChange={this.handleChange}
      />
    );
  }
}


storiesOf('Drawer', module)
  .add('initial setup', () => (
    <InputDrawer />
  ));
