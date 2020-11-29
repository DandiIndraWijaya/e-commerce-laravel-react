import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
    float: ${props => props.float};
    border: unset;
    outline: unset;
    border-radius: 50px;
    background-color: gainsboro;
    color : black;
    padding: 5px;
    &:focus {
        outline: none;
        box-shadow: none;
    }
`;

const Button = ({ float, text }) => {
    if(float === ''){
        float = ''
    }
    return (
        <StyledButton float={float}>
            {text}
        </StyledButton>
    )
}

Button.defaultProps = {
    float: ''
}

export default Button;