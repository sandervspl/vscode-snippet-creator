import styled from 'styled-components';
import { AppBar } from '@material-ui/core';
import { theme } from 'app/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  h2 {
    color: ${props => props.theme.color.primaryText};
  }
`;

export const StyledAppBar = styled(AppBar)`
  height: 64px;
  background-color: ${props => props.theme.color.primaryBgLight} !important;
`;

export const EditorsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
