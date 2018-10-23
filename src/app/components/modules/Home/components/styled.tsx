import styled, { css } from 'styled-components';
import AppBar from '@material-ui/core/AppBar';

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
      /* fill: ${props => props.theme.color.primaryText}; */
    }
  }
`;

export const Form = styled.div`
  h2 {
    padding: 15px 20px;
    border-bottom: black;
    color: ${props => props.theme.color.primaryText} !important;
    font-size: 1em;
  }
`;

export const FormInner = styled.div`
  padding: 0 10px 10px;

  div:last-child {
    display: flex;
    justify-content: flex-end;
  }
`;

export const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #383838;

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

  > div {
    margin: 0;
  }
  
  > * {
    color: ${props => props.theme.color.primaryText} !important;

    > div {
      ${props => props.small && css`
        width: 40px;
        height: 40px;
      `}
      color: ${props => props.theme.color.primaryText} !important;

      &:hover {
        > fieldset {
          border-color: ${props => props.theme.color.black} !important;
        }
      }

      > fieldset {
        padding: 0 !important;
        border-color: ${props => props.theme.color.primaryBg} !important;

        + input {
          text-align: center;
          padding: 0;
        }
      }
    }
  }
`;
