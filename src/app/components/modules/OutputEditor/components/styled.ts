import styled from '@styled-components';
import { MonacoEditor } from 'common/Editor';

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  min-height: 48px;
  background-color: ${(props) => props.theme.color.primaryBg};

  button {
    color: ${(props) => props.theme.color.primaryText};
    background-color: none;
    box-shadow: none;

    &:hover {
      color: ${(props) => props.theme.color.white};
      background-color: none;
    }
  }
`;

export const OutputMonacoEditor = styled(MonacoEditor)`
  .view-line {
    &:first-child,
    &:last-child {
      span > .mtk9 {
        color: gray;
      }
    }
  }
`;

export const EditorIndicator = styled.span`
  color: ${(props) => props.theme.color.gray.light};
  font-family: ${(props) => props.theme.font.primary};
`;
