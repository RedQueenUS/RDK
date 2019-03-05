import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
    height: ${props => props.height || '300px'};
    width: ${props => props.width || '300px'};
    border-radius: .4rem;
    box-shadow: 10px 10px 5px #aaaaaa;
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