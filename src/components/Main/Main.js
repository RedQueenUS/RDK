import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import styled from 'styled-components';
import { Card } from '../RQUI';

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10rem;
    font-size: 1.7rem;
`

const StyledCard = styled(Card)`
    width: 400px;
    height: 400px;
`

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
                                <StyledCard></StyledCard>
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

