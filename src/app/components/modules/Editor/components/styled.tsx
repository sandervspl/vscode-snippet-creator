import styled from 'styled-components';
import { Tabs, TextField } from '@material-ui/core';
import { theme } from 'app/styles';

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
  background-color: ${theme.color.primaryBg};
  transition: background-color 1s ease-in-out;

  button {
    color: ${theme.color.primaryText};

    &.MuiTab-selected-15 {
      background-color: ${theme.color.primaryBgLight};
    }
  }
`;
