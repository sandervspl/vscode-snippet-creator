import * as i from 'app/interfaces';
import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Tabs, Tab, Modal, TextField, Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import Stores from 'app/stores';
import { Modal as ModalInner } from 'components/common';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Input = styled(TextField)`
  flex: 1;
`;

@inject(Stores.editorTabsStore)
@observer
class TabsContainer extends React.Component<TabsProps> {
  @observable open = true;
  @observable name = '';
  @observable prefix = '';

  @action
  handleOpen = () => {
    this.open = true;
  }

  @action
  handleClose = () => {
    if (this.props.editorTabsStore.tabs.length > 1) {
      this.open = false;
      this.name = '';
      this.prefix = '';
    }
  }
  
  @action
  handleTabChange = (event, value) => {
    const { editorTabsStore } = this.props;
    const { tabs } = editorTabsStore;
    
    if (tabs[value] && tabs[value].id === 0) {
      this.handleOpen();
    } else {
      editorTabsStore.tabId = value;
    }
  }

  @action
  handleChange = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
    this[name] = event.currentTarget.value;
  }

  @action handleButtonClick = () => {
    const { addTab } = this.props.editorTabsStore;
    addTab(this.name, this.prefix);
    this.handleClose();
  }
  
  render() {
    return (
      <>
        <Tabs
          value={this.props.tabId}
          onChange={this.handleTabChange}
          scrollable
          scrollButtons="off"
        >
          {this.props.editorTabsStore.tabs.map(tab => {
            const tabProps = tab.id === 0 ? { icon: <AddCircle /> } : { label: tab.name };
            return <Tab key={tab.id} {...tabProps} />;
          })}
        </Tabs>

        <Modal open={this.open} onClose={this.handleClose}>
          <ModalInner>
            <Form noValidate autoComplete="off">
              <Input
                id="name"
                label="Name"
                value={this.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <Input
                id="prefix"
                label="Prefix"
                value={this.prefix}
                onChange={this.handleChange('prefix')}
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={this.handleButtonClick}>
                Add snippet
              </Button>
            </Form>
          </ModalInner>
        </Modal>
      </>
    );
  }
}

interface TabsProps {
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default TabsContainer;
