import {useRouter} from 'next/router'
import {gql} from '@apollo/client'
import Layout from 'components/Layout'
import UserCard from 'components/UserCard'

import { useSingleUserQuery } from "graphql_client/generated"

gql`
  query SingleUser($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      projects {
        id
        name
        icon_url
      }
    }
  }
`


export default function UserPage() {
  const {query} = useRouter()

  const {data, error, loading} = useSingleUserQuery(
    {
      skip: !query.id,
      variables: {id: Number(query.id)},
    }
  )
  const user = data?.user;

  if (!user || loading || error) {
    return null
  }

  return (
    <Layout>
      <UserCard user={user} />
    </Layout>
  )
}
