import React from 'react';
import styled from 'styled-components';

const StyledCardHeader = styled.div`
    height: 50%;
    width: 100%;
    background: black;
    display: flex;
`;

const CardHeader = ({ children }) => {
    return (
        <StyledCardHeader>
            {children}
        </StyledCardHeader>
    )
};

export default CardHeader;