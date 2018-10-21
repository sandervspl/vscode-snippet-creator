import styled from 'styled-components';
import MaterialModal from '@material-ui/core/Modal';

export const Modal = styled(MaterialModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 300px;
  background: ${props => props.theme.color.primaryBgLight};
  border-radius: 4px;
  outline: 0;

  > * {
    color: ${props => props.theme.color.primaryText} !important;
  }

  button:last-of-type {
    margin-top: 20px;
  }
`;
