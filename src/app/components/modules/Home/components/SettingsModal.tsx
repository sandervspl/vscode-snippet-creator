import * as i from '@types';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Stores from 'app/stores';
import { H2, P } from 'common/Typography';
import { Modal } from 'common/Modal';
import { Input, Select } from 'common/Form';
import { Field, FormInner, SettingsInnerModal, Buttons } from './styled';

@inject(Stores.editorStore)
@observer
class SettingsModal extends React.Component<Props> {
  handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.editorStore!.options.language = event.target.value;
  }
  
  handleIndentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.editorStore!.options.indent = Number(event.target.value);
  }

  render() {
    const { open, onClose, editorStore } = this.props;

    return (
      <Modal open={open} onClose={onClose}>
        <SettingsInnerModal>
          <H2>Preferences</H2>

          <FormInner>
            <Field small>
              <P>Indent</P>
              <Input
                defaultValue={editorStore!.options.indent}
                onChange={this.handleIndentChange}
              />
            </Field>
            <Field>
              <P>Language</P>
              <Select
                value={editorStore!.options.language}
                onChange={this.handleLanguageChange}
              >
                {['javascript', 'typescript'].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </FormInner>

          <Buttons>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={onClose}>
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
