import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { GET_COUNTER } from './Counter';

const INCREMENT_COUNT_BY = gql`
    mutation IncrementCountBy($incrementBy: Int!) {
        incrementCountBy(incrementBy: $incrementBy) @client {
            incrementBy
        }
    }
`;

class IncrementForm extends Component {
    state = {}
    render() {
        let input;
        return ( 
            <Query query={GET_COUNTER}>
                {({ data }) => {
                    const { counter } = data;

                    return (
                        <Mutation mutation={INCREMENT_COUNT_BY} vairables={counter}>
                            {incrementCountBy => (
                                <div>
                                    <form 
                                        onSubmit={(e) => {
                                            let { value } = input;
                                            e.preventDefault();
                                            incrementCountBy({ variables: { incrementBy: parseInt(value)  }})
                                            value = '';
                                        }}
                                    >
                                        <input ref={node => { input = node }} placeholder={`Pick a number`}/>
                                        <button type="submit">Change the increment number</button>                                    
                                    </form> 
                                    <Link to="/counter">Counter</Link>
                                </div>                                
                            )}                        
                        </Mutation>
                    )
                }}
            </Query>            
        );
    }
}
 
export default IncrementForm;