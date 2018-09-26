import styled from 'styled-components';
import { Tabs, TextField } from '@material-ui/core';

export const EditorContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

export const MonacoEditor = styled.div`
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Input = styled(TextField)`
  flex: 1;
`;

export const StyledTabs = styled(Tabs)`
  background-color: ${props => props.theme.color.primaryBg};
  transition: background-color 1s ease-in-out;

  button {
    color: ${props => props.theme.color.primaryText};

    &.MuiTab-selected-15 {
      background-color: ${props => props.theme.color.primaryBgLight};
    }
  }
`;
