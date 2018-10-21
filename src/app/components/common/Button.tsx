import * as i from '@types';
import * as React from 'react';
import styled from 'styled-components';

export const Button = styled.button<ButtonProps>`
    background: ${props => props.theme.color.primary};
    padding: 10px 20px;
    border: none;
    color: ${props => props.theme.color.white};
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: ${props => props.theme.font.futura};
`;

// PropTypes as interface
export interface ButtonProps extends i.BaseStyled, React.ButtonHTMLAttributes<HTMLButtonElement> {}
