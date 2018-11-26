import gql from 'graphql-tag';

export default (_, { incrementBy }, { cache }) => {
    const query = gql`
        query GetCounter {
            counter @client {
                incrementBy
            }
        }
    `;

    const previousState = cache.readQuery({ query })

    const data = {
        counter: {
            ...previousState.counter,
            incrementBy
        }
    }

    cache.writeData({ data });

    return null;

}