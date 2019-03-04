import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';

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
    const { data, loading, error } = useQuery(GET_COUNTER);
    const { counter } = data;
    const incrementCount = useMutation(INCREMENT_COUNT, { 
        variables: counter
    });
    
    if (error) return <h1>Error...</h1>
    if (loading) return <h1>Loading...</h1>
    const { count, incrementBy } = counter;
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={incrementCount}>Increment by {incrementBy}</button>                    
            <Link to="/form">Form</Link>
        </div>
     );
}
 
export default Counter;

export { GET_COUNTER }