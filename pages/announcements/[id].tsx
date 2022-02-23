import {useRouter} from 'next/router'
import {gql} from '@apollo/client'
import Layout from 'components/Layout'
import AnnouncementCard from 'components/AnnouncementCard'

import { useSingleAnnouncementQuery } from "graphql_client/generated"

gql`
  query SingleAnnouncement($id: Int!) {
    announcement(id: $id) {
      id
      fellowship
      title
      body
    }
  }
`

export default function AnnouncementPage() {
  const {query} = useRouter()

  const {data, error, loading} = useSingleAnnouncementQuery(
    {
      skip: !query.id,
      variables: {id: Number(query.id)},
    }
  )
  
  const announcement = data?.announcement;

  if (!announcement || loading || error) {
    return null
  }

  return (
    <Layout>
      <AnnouncementCard announcement={announcement} />
    </Layout>
  )
}