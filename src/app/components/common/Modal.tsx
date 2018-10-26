import styled from '@styled-components';
import MaterialModal from '@material-ui/core/Modal';

export const Modal = styled(MaterialModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-width: 300px;
  background: ${props => props.theme.color.primaryBgLight};
  border-radius: 4px;
  outline: 0;

  > * {
    color: ${props => props.theme.color.primaryText} !important;
  }

  h2 {
    font-weight: 700;
  }
`;
