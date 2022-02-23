import {server} from 'graphql_server/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default server.createHandler({ path: '/api/graphql' })
