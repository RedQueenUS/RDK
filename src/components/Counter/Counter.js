import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const GET_COUNTER = gql`
    {
        counter {
            count,
            incrementBy
        }
    }
`;

const INCREMENT_COUNT = gql`
    mutation IncrementCount($count: Int!, $incrementBy: Int!) {
        incrementCount(count: $count, incrementBy: $incrementBy) @client {
            count
        }
    }
`;  

const Counter = () => {
    return ( 
        <Query query={GET_COUNTER}>
            {({ data }) => {
                const { counter } = data;
                const { count, incrementBy } = counter;

                return (
                    <Mutation mutation={INCREMENT_COUNT} variables={counter}>
                        {incrementCount => (
                            <div>
                                <h1>{count}</h1>
                                <button onClick={incrementCount}>Increment by {incrementBy}</button>                    
                                <Link to="/form">Form</Link>
                            </div>   
                        )}                 
                    </Mutation>
                )
            }}

        </Query>

     );
}
 
export default Counter;

export { GET_COUNTER }