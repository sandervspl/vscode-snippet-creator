import styled from 'styled-components';

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 300px;
  background: white;
  position: absolute;
  left: calc(50% - 250px);
  top: calc(50% - 150px);
  padding: 20px;
  border-radius: 4px;
  outline: 0;
`;