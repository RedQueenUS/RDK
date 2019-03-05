import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from '../RQUI';

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10rem;
    font-size: 1.7rem;
`;

class Main extends Component {
    render() {
        const { DefaultComponent } = this.props;
        return (
            <div>
                {
                    !DefaultComponent ? (
                        <div> 
                            <Navbar>
                                <Link to="/">Home</Link>
                                <Link to="/task-list">Task List</Link>
                                <Link to="/fetch-example">Fetch Example</Link>
                                <Link to="/documentation">Documentation</Link>
                                <Link to="/asset-gallery">Asset Gallery</Link>
                            </Navbar>
                            <HeaderDiv>
                                <h1>Welcome Runecrafter!</h1>
                            </HeaderDiv>
                            
                        </div>
                    )
                    : (
                        <div>
                            <Navbar>
                                <Link to="/">Home</Link>
                                <Link to="/task-list">Task List</Link>
                                <Link to="/fetch-example">Fetch Example</Link>
                                <Link to="/documentation">Documentation</Link>
                                <Link to="/asset-gallery">Asset Gallery</Link>
                            </Navbar>
                            <DefaultComponent /> 
                        </div>
                    )
                }                                            
            </div>                                                    
        )
    };
};
 
export default Main;

