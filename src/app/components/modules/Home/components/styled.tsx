import styled from 'styled-components';
import { AppBar } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const StyledAppBar = styled(AppBar)`
  height: 64px;
`;

export const EditorsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;