import incrementCountBy from './Mutations/incrementCountBy';
import incrementCount from './Mutations/incrementCount';

// We export our Mutations (defined inside of their respective resolver definitions above in the 'Mutations' folder)

// They are then consumed by the ApolloClient in the root index.js
export default {
    Mutation: {
        incrementCountBy,
        incrementCount
    }
}