import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    height: ${props => props.height || 'auto'};
    width: ${props => props.width || 'auto'};
    border-radius: .4rem;
    box-shadow: 3px 5px 5px #aaaaaa;
    display: flex;
    flex-direction: column;
`

const Card = (props) => {
    const { children } = props;
    return (
        <StyledCard {...props}>
            {children}
        </StyledCard>
    ) 
};

export default Card;

