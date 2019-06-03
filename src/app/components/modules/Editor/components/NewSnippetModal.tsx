import * as i from '@types';
import React, { Component, FormEvent, createRef } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Stores from 'app/stores';
import { H2 } from 'common/Typography';
import { Modal } from 'common/Modal';
import { Input } from 'common/Form';
import { Form, NewSnippetInnerModal } from './styled';

@inject(Stores.editorTabsStore)
@observer
class NewSnippetModal extends Component<Props> {
  @observable name = '';
  @observable prefix = '';

  @action
  handleChange = (event) => {
    this[event.currentTarget.name] = event.currentTarget.value;
  }

  @action
  handleClose = () => {
    this.name = '';
    this.prefix = '';

    this.props.onClose();
  }

  @action
  handleButtonClick = () => {
    const { addTab } = this.props.editorTabsStore!;
    addTab(this.name, this.prefix);
    this.handleClose();
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <NewSnippetInnerModal>
          <H2>New Snippet</H2>
          <Form noValidate autoComplete="off">
            <Input
              name="name"
              label="Name"
              value={this.name}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
            <Input
              name="prefix"
              label="Shortcut text"
              value={this.prefix}
              onChange={this.handleChange}
              margin="dense"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleButtonClick}
            >
              Add snippet
            </Button>
          </Form>
        </NewSnippetInnerModal>
      </Modal>
    );
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
  editorTabsStore?: i.EditorTabsStore;
}

export default NewSnippetModal;
