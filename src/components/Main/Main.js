import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

class Main extends Component {
    render() {
        const { DefaultComponent } = this.props;
        return (
            <div>
                {
                    !DefaultComponent ? (
                        <div> 
                            <Navbar />
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

