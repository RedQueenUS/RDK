import React from 'react';
import styled from 'styled-components';

const StyledCardHeader = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    background: ${props => props.background}
`;

const CardHeader = (props) => {
    const { children } = props;
    return (
        <StyledCardHeader {...props}>
            {children}
        </StyledCardHeader>
    )
};

export default CardHeader;