import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import styled from 'styled-components';

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
                            <Navbar />
                            <HeaderDiv>
                                <h1>Welcome Runecrafter!</h1>
                            </HeaderDiv>
                            
                        </div>
                    )
                    : (
                        <div>
                            <Navbar />
                            <DefaultComponent /> 
                        </div>
                    )
                }                                            
            </div>                                                    
        )
    };
};
 
export default Main;

