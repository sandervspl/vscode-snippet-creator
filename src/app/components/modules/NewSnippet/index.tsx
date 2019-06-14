import * as i from '@types';
import React, { Component, createRef } from 'react';
import { observable, action, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Stores from 'app/stores';
import { Input } from 'common/Form';
import { NewSnippetContainer, Form, ButtonGroup } from './styled';

@inject(Stores.editorTabsStore)
@observer
class NewSnippetForm extends Component<Props> {
  nameInputRef = createRef<HTMLInputElement>();

  @observable name = '';
  @observable prefix = '';

  setFocusOnTabChange = reaction(
    () => this.props.editorTabsStore!.tabId,
    () => {
      if (this.nameInputRef.current) {
        this.nameInputRef.current.focus();
      }
    }
  )

  @action
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    const { updateTab } = this.props.editorTabsStore!;

    this[name] = value;

    updateTab(this.name, this.prefix);
  }

  @action
  onAddSnippet = () => {
    const { updateTab } = this.props.editorTabsStore!;

    updateTab(this.name, this.prefix, true);
  }

  onCancelClick = () => {
    const { removeTab, tabId } = this.props.editorTabsStore!;

    removeTab(tabId);
  }

  render() {
    const { tabId, isFirstTab } = this.props.editorTabsStore!;

    return (
      <NewSnippetContainer>
        <Typography variant="h2">New Snippet</Typography>
        <Form noValidate autoComplete="off">
          <Input
            name="name"
            label="Name"
            value={this.name}
            onChange={this.handleChange}
            margin="dense"
            variant="outlined"
            inputRef={this.nameInputRef}
          />
          <Input
            name="prefix"
            label="Shortcut text"
            value={this.prefix}
            onChange={this.handleChange}
            margin="dense"
            variant="outlined"
          />
          <ButtonGroup>
            <Button onClick={this.onCancelClick} disabled={isFirstTab(tabId)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onAddSnippet}
            >
            Add snippet
            </Button>
          </ButtonGroup>
        </Form>
      </NewSnippetContainer>
    );
  }
}

interface Props {
  editorTabsStore?: i.EditorTabsStore;
}

export default NewSnippetForm;
