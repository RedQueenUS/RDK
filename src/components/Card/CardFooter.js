import React from 'react';
import styled from 'styled-components';

const StyledCardFooter = styled.div`
    height: 50%;
    width: 100%;
    background: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.fontSize || '1.4rem'}
`;

const CardFooter = ({ children }) => {
    return (
        <StyledCardFooter>
            {children}
        </StyledCardFooter>
    )
};

export default CardFooter;