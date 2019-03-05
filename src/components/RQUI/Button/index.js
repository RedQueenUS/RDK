import React from 'react'
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 2rem;
    border-radius: .8rem;
    background: white;
    color: black;
`

export const Button = (props) => {
    const { children } = props;
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    )
};

