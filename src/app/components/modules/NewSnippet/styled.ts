import styled from '@styled-components';
import { Input } from 'common/Form';

export const NewSnippetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;

  h2 {
    margin-bottom: 30px;
    font-size: 28px;
    text-transform: uppercase;
  }

  ${Input} {
    margin-bottom: 10px !important;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    flex-basis: 49%;

    .MuiButton-label {
      color: ${(props) => props.theme.color.white};
    }

    &:disabled {
      .MuiButton-label {
        color: ${(props) => props.theme.color.gray.light};
      }
    }
  }
`;
