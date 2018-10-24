import * as i from '@types';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import { ModalInner } from 'common/Modal';

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  background-color: ${props => props.theme.color.primaryBg};

  svg {
    width: 15px;
    fill: ${props => props.theme.color.primaryText};
    cursor: pointer;

    &:hover {
      fill: ${props => props.theme.color.white}; 
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  background-color: ${props => props.theme.color.primaryBg};
  transition: background-color 1s ease-in-out;

  *::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }

  button {
    /* width: 100%; */
    width: ${props => `calc(100% / ${props.tabsAmount})`};
    min-width: 75px;
    max-width: 150px;
    text-align: left;
    color: ${props => props.theme.color.primaryText};
    white-space: nowrap;

    &:last-child {
      width: 75px;
    }

    &[aria-selected="true"],
    &:hover {
      background-color: ${props => props.theme.color.primaryBgLight};

      + ${CloseButton} {
        background: transparent;
      }

      svg {
        fill: ${props => props.theme.color.white};
      }
    }
  }
`;

export const TabContainer = styled.div<TabContainerProps>`
  position: relative;
  width: ${props => `calc(100% / ${props.tabsAmount})`};
  min-width: 75px;
  max-width: 150px;

  &:last-child {
    width: 75px;
  }
`;
interface TabContainerProps extends i.BaseStyled {
  tabsAmount: number;
}

export const NewSnippetInnerModal = styled(ModalInner)`
  h2 {
    margin-bottom: 10px;
  }

  button {
    margin-top: 20px;
  }

  div:not(:last-of-type) {
    margin-bottom: 8px !important;
  }
`;
