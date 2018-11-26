import gql from 'graphql-tag';

export default (_, { incrementBy, count }, { cache }) => {
    const query = gql`
        query GetCountAndIncrement {
            counter @client {
                incrementBy,
                count
            }
        }
    `;

    const previousState = cache.readQuery({ query })

    const data = {
        counter: {
            ...previousState.counter,
            count: count + incrementBy
        }
    }

    cache.writeData({ data });

    return null;

}