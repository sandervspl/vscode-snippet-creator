import * as i from '@types';
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

export const StyledTabs = styled(Tabs)<StyledTabsProps>`
  background-color: ${props => props.theme.color.primaryBg};
  transition: background-color 1s ease-in-out;

  *::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }

  button {
    width: ${props => `calc(100% / ${props.tabsAmount})`};
    min-width: 75px;
    text-align: left;
    color: ${props => props.theme.color.primaryText};
    white-space: nowrap;

    &[aria-selected="true"],
    &:hover {
      background-color: ${props => props.theme.color.primaryBgLight};

      svg {
        fill: ${props => props.theme.color.white};
      }
    }

    &:last-child {
      width: 75px;
    }
  }
`;

interface StyledTabsProps extends i.BaseStyled {
  tabsAmount: number;
}
