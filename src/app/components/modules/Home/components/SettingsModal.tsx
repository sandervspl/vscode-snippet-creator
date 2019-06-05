import * as i from '@types';
import React, { Component, ChangeEvent } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Stores from 'app/stores';
import { Modal } from 'common/Modal';
import { H2, P } from 'common/Typography';
import { Input, Select } from 'common/Form';
import { Field, FormInner, SettingsInnerModal, Buttons } from './styled';
import { localStorageHelper } from 'app/services';

@inject(Stores.editorStore)
@observer
class SettingsModal extends Component<Props> {
  private originalSettings: i.EditorOptions;
  @observable private newSettings: i.EditorOptions;

  constructor(props: Props) {
    super(props);
    
    this.init();
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.open && this.props.open) {
      this.init();
    }
  }

  init = () => {
    const storage = localStorageHelper.editor.get();

    this.originalSettings = storage
      ? storage.options
      : this.props.editorStore!.options;

    this.newSettings ={ ...this.originalSettings };
  }

  handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.newSettings.language = event.target.value as i.EditorOptions['language'];
  }
  
  handleIndentChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.newSettings.indent = Number(event.target.value);
  }

  handleEditorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.newSettings.editor = event.target.value as i.EditorOptions['editor'];
  }

  onCancel = () => {
    // Reset to original settings
    this.newSettings = { ...this.originalSettings };

    this.props.onClose();
  }

  onSave = () => {
    // Save new settings to store
    this.props.editorStore!.options = { ...this.newSettings };

    // Save to local storage
    localStorageHelper.editor.set({
      options: { ...this.newSettings },
    });

    this.props.onClose();
  }

  render() {
    const { open, onClose, editorStore } = this.props;

    return (
      <Modal open={open} onClose={onClose}>
        <SettingsInnerModal>
          <H2>Settings</H2>

          <FormInner>
            <Field small>
              <P>Indent</P>
              <Input
                // defaultValue={editorStore!.options.indent}
                value={this.newSettings.indent}
                onChange={this.handleIndentChange}
              />
            </Field>
            <Field>
              <P>Language</P>
              <Select
                // value={editorStore!.options.language}
                value={this.newSettings.language}
                onChange={this.handleLanguageChange}
              >
                {['javascript', 'typescript'].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Field>
            <Field>
              <P>Editor</P>
              <Select
                // value={editorStore!.options.editor}
                value={this.newSettings.editor}
                onChange={this.handleEditorChange}
              >
                {['VS Code', 'Atom'].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </FormInner>

          <Buttons>
            <Button onClick={this.onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onSave}
            >
              Save
            </Button>
          </Buttons>
        </SettingsInnerModal>
      </Modal>
    );
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
  editorStore?: i.EditorStore;
}

export default SettingsModal;
