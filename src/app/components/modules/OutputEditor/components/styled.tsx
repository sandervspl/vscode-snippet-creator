import styled from 'styled-components';
import { MonacoEditor } from 'common/Editor';

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.color.primaryBg};

  button {
    color: ${props => props.theme.color.primaryText};
    background: none;
    box-shadow: none;

    &:hover {
      background-color: transparent;
      color: ${props => props.theme.color.white};
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
