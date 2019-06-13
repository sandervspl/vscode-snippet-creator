import * as i from '@types';
import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { inject, observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import Stores from 'app/stores';
import { H2 } from 'common/Typography';
import { Input } from 'common/Form';

@inject(Stores.editorTabsStore)
@observer
class NewSnippetModal extends Component<Props> {
  @observable name = '';
  @observable prefix = '';

  @action
  handleChange = (event) => {
    const { value, name } = event.currentTarget;
    const { updateTab } = this.props.editorTabsStore!;

    this[name] = value;

    if (name === 'name') {
      updateTab(value);
    }
  }

  @action
  handleButtonClick = () => {
    const { updateTab } = this.props.editorTabsStore!;

    updateTab(this.name, this.prefix, true);
  }

  render() {
    return (
      <>
        <H2>New Snippet</H2>
        <form noValidate autoComplete="off">
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
        </form>
      </>
    );
  }
}

interface Props {
  editorTabsStore?: i.EditorTabsStore;
}

export default NewSnippetModal;
