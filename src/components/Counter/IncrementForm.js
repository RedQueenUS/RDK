import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { GET_COUNTER } from './Counter';

const INCREMENT_COUNT_BY = gql`
    mutation IncrementCountBy($incrementBy: Int!) {
        incrementCountBy(incrementBy: $incrementBy) @client {
            incrementBy
        }
    }
`;

const IncrementForm = () => { 
    const { data } = useQuery(GET_COUNTER);
    const { counter } = data;
    const incrementCountBy = useMutation(INCREMENT_COUNT_BY, {
        variables: counter
    });
    let input;
    return (
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
    )
}
 
export default IncrementForm;