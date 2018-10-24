import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Input = styled(TextField)`
  flex: 1;

  fieldset {
    border-color: ${props => props.theme.color.border};

    &:active,
    &:focus {
      border-color: ${props => props.theme.color.border.focus} !important;
    }
  }

  > div {
    &:hover {
      fieldset {
        border-color: ${props => props.theme.color.border.focus} !important;
      }
    }

    &::before,
    &::after {
      border-color: ${props => props.theme.color.primaryText} !important;
    }
  }

  input,
  label {
    color: ${props => props.theme.color.primaryText} !important;
  }
`;
