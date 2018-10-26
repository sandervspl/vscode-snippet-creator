import styled from '@styled-components';

export const H2 = styled.h2`
  margin: 0;
  text-transform: uppercase;
  font-size: 18px;
  font-family: ${props => props.theme.font.primary};
  color: ${props => props.theme.color.primaryText};
`;
