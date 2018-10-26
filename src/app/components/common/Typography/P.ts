import styled from '@styled-components';

export const P = styled.p`
  margin: 0;
  font-size: 16px;
  font-family: ${props => props.theme.font.primary};
  color: ${props => props.theme.color.primaryText};
`;
