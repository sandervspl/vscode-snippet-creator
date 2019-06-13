import styled from '@styled-components';
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
  background-color: ${(props) => props.theme.color.primaryBg};

  svg {
    width: 15px;
    fill: ${(props) => props.theme.color.primaryText};
    cursor: pointer;

    &:hover {
      fill: ${(props) => props.theme.color.white}; 
    }
  }
`;

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
