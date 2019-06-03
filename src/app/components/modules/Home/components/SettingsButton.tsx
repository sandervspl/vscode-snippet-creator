// @ts-ignore
import React, { Component, lazy } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import { SettingsContainer } from './styled';
import SettingsModal from './SettingsModal';

@observer
class SettingsButton extends Component {
  @observable open = false;

  @action
  handleOpen = () => {
    this.open = true;
  }

  @action
  handleClose = () => {
    this.open = false;
  }

  render() {
    return (
      <SettingsContainer>
        <Button onClick={this.handleOpen}>
          <SettingsIcon />
          Settings
        </Button>

        <SettingsModal open={this.open} onClose={this.handleClose} />
      </SettingsContainer>
    );
  }
}

export default SettingsButton;
