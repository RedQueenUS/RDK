import React from 'react';
import styled from 'styled-components';

const StyledCardFooter = styled.div`
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.fontSize || '1.4rem'}
    background: ${props => props.background}
`;

const CardContent = (props) => {
    const { children } = props;
    return (
        <StyledCardFooter {...props}>
            {children}
        </StyledCardFooter>
    )
};

export default CardContent;