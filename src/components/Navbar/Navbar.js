import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 8rem;
    background: red;
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

const Navbar = () => {
  return (
    <StyledNav>
        <Link to="/">Home</Link>
        <Link to="/task-list">Task List</Link>
        <Link to="/fetch-example">Fetch Example</Link>
        <Link to="/documentation">Documentation</Link>
        <Link to="/asset-gallery">Asset Gallery</Link>
    </StyledNav>
  )
}

export default Navbar



