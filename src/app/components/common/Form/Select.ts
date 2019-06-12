import styled from '@styled-components';
import TextField from '@material-ui/core/TextField';

export const Select = styled(TextField).attrs({
  select: true,
  variant: 'outlined',
  margin: 'dense',
})`
  margin: 0 !important;

  > div {
    color: ${(props) => props.theme.color.primaryText} !important;
    
    &:hover {
      fieldset {
        border-color: ${(props) => props.theme.color.border.focus} !important;
      }
    }
  }

  fieldset {
    padding: 0 !important;
    border-color: ${(props) => props.theme.color.border} !important;

    & + div > svg {
      fill: ${(props) => props.theme.color.primaryText} !important;
    }
  }

  input,
  label {
    color: ${(props) => props.theme.color.primaryText} !important;
  }
`;
