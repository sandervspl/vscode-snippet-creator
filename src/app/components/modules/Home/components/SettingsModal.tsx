import * as i from '@types';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Stores from 'app/stores';
import { Modal, ModalInner } from 'common/Modal';
import { Form, Field, FormInner } from './styled';

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
        <ModalInner>
          <Form>
            <Typography variant="title">Preferences</Typography>

            <FormInner>
              <Field small>
                <Typography variant="body2">Indent</Typography>
                <TextField
                  id="outlined-bare"
                  defaultValue={editorStore!.options.indent}
                  onChange={this.handleIndentChange}
                  margin="normal"
                  variant="outlined"
                />
              </Field>
              <Field>
                <Typography variant="body2">Language</Typography>
                <TextField
                  id="outlined-select-currency"
                  select
                  value={editorStore!.options.language}
                  onChange={this.handleLanguageChange}
                  // SelectProps={{
                  //   MenuProps: {
                  //     className: classes.menu,
                  //   },
                  // }}
                  // helperText="Please select your currency"
                  margin="normal"
                  variant="outlined"
                >
                  {['javascript', 'typescript'].map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Field>

              <div>
                <Button variant="contained" onClick={onClose}>
                  Save
                </Button>
              </div>
            </FormInner>
          </Form>
        </ModalInner>
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
