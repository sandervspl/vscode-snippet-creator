import * as i from '@types';
import * as React from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Stores from 'app/stores';
import { Title } from '@common';
import { Modal } from 'common/Modal';
import { Input } from 'common/Form';
import { Form, NewSnippetInnerModal } from './styled';

@inject(Stores.editorTabsStore)
@observer
class NewSnippetModal extends React.Component<Props> {
  @observable name = '';
  @observable prefix = '';
  nameElement = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.nameElement.current) {
      this.nameElement.current.focus();
    }
  }

  @action
  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
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
          <Title>New Snippet</Title>
          <Form noValidate autoComplete="off">
            <Input
              name="name"
              label="Name"
              value={this.name}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              ref={this.nameElement}
            />
            <Input
              name="prefix"
              label="Prefix"
              value={this.prefix}
              onChange={this.handleChange}
              margin="normal"
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
