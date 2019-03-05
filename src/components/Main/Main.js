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
                            <Link to="/task-list">Task List</Link>
                            <Link to="/fetch-example">Fetch Example</Link>
                            <Link to="/documentation">Documentation</Link>
                            <Link to="/asset-gallery">Asset Gallery</Link>
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

