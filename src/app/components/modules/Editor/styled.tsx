import styled from 'styled-components';
import { theme } from 'app/styles';

export const EditorContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;

  .MuiTabs-root-1 {
    background-color: ${theme.color.primaryBg};
    transition: background-color 1s ease-in-out;

    button {
      color: ${theme.color.primaryText};

      &.MuiTab-selected-15 {
        background-color: ${theme.color.primaryBgLight};
      }
    }
  }
`;

export const MonacoEditor = styled.div`
  height: 100%;
`;
