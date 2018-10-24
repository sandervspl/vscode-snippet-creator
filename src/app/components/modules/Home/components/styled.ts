import styled, { css } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import { ModalInner } from 'common/Modal';
import { P } from 'common/Typography';

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
  
  > div {
    justify-content: space-between;
  }
`;

export const EditorsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const SettingsContainer = styled.div`
  button {
    color: ${props => props.theme.color.primaryText};

    svg {
      margin-right: 5px;
      font-size: 18px;
    }
  }
`;

export const SettingsInnerModal = styled(ModalInner)`
  padding: 30px 0;
  width: 400px;

  h2 {
    margin: 0 20px 20px;
  }

  button {
    &:first-of-type {
      margin-right: 20px;
      color: ${props => props.theme.color.primaryText};
    }
  }
`;

export const FormInner = styled.div`
  margin-bottom: 20px;
  background-color: #383838;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;

  button {
    min-width: 100px;
  }
`;

export const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  padding: 10px 0;

  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 4px 4px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${props => props.theme.color.primaryBgLight};
  }

  > p {
    font-size: 1em;
  }
  
  > * > div {
    ${props => props.small && css`
      width: 40px;
      height: 40px;
    `}

    > fieldset + input {
      text-align: center;
      padding: 0;
    }
  }
`;
