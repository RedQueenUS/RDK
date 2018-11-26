import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    render() {
        const { DefaultComponent } = this.props;
        return (
            <div>
                {
                    !DefaultComponent ? (
                        <div>
                            <Link to="/counter">To the Counter</Link>
                            <Link to="/form">To the Increment form</Link>
                        </div>
                    )
                    : (
                        <DefaultComponent /> 
                    )
                }
                               
            </div>                                                    
        )
    };
};
 
export default Main;