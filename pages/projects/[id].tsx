import {useRouter} from 'next/router'
import {gql} from '@apollo/client'
import Layout from 'components/Layout'
import ProjectCard from 'components/ProjectCard'

import { useSingleProjectQuery } from "graphql_client/generated"

gql`
  query SingleProject($id: Int!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`

export default function ProjectPage() {
  const {query} = useRouter()

  const {data, error, loading} = useSingleProjectQuery(
    {
      skip: !query.id,
      variables: {id: Number(query.id)},
    }
  )
  const project = data?.project;

  if (!project || loading || error) {
    return null
  }

  return (
    <Layout>
      <ProjectCard project={project} />
    </Layout>
  )
}