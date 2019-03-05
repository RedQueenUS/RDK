import React from 'react'
import styled from 'styled-components';

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 8rem;
    background: ${props => props.background || 'red'};
    font-size: 14px;

    & a {
        text-decoration: none;
        color: white;

        &::before {
            text-decoration: none;
        }

        &::after{
            text-decoration: none;
        }

        &:visited {
            text-decoration: none;
            color: white;
        }

    }
`

export const Navbar = (props) => {
    const { children } = props
    return (
        <StyledNav {...props}>
            {children}
        </StyledNav>
    )
};




