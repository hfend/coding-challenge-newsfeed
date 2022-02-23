import {ApolloClient, InMemoryCache} from '@apollo/client'
import { offsetLimitPagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: '/api/graphql',
  cache : new InMemoryCache({
    typePolicies: {
      NewsfeedItem: {
        keyFields: ["type", "id"]
      },
      Query: {
        fields: {
          newsfeed: offsetLimitPagination(["fellowship", "limit"])
        }
      }
    }
  })
})

export default client
