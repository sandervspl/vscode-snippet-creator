import styled from 'styled-components';
import { Tabs, TextField } from '@material-ui/core';

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Input = styled(TextField)`
  flex: 1;

  > div {
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

export const StyledTabs = styled(Tabs)`
  background-color: ${props => props.theme.color.primaryBg};
  transition: background-color 1s ease-in-out;

  button {
    color: ${props => props.theme.color.primaryText};

    &[aria-selected="true"],
    &:hover {
      background-color: ${props => props.theme.color.primaryBgLight};

      svg {
        fill: ${props => props.theme.color.white};
      }
    }
  }
`;
