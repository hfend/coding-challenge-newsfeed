import Link from 'next/link'
import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'

import type { User, Project } from "graphql_client/generated"

interface ProjectLite extends Pick<Project, 'id'|'name'|'icon_url'> {}
export interface UserLite extends Pick<User, 'id'|'name'|'bio'|'fellowship'|'avatar_url'> {
  projects?: ProjectLite[]
}

type Props = {
  user: UserLite;
}

export default function UserCard({user}: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Avatar src={user.avatar_url}/>
        </ColumnLeft>
        <ColumnRight>
          <h2><Link href={`/users/${user.id}`}>{user.name}</Link></h2>
          <p>Fellowship: {user.fellowship}</p>
          <Markdown>{user.bio}</Markdown>
          {!!user?.projects?.length && (
            <>
              <h3>Projects:</h3>
              {user.projects.map(p => (
                <ProjectItem key={p.id} project={p} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </Card>
  )
}

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`

function ProjectItem({project}: {project: ProjectLite}) {
  return (
    <ProjectContainer>
      <ProjectColumnLeft>
        <ProjectIcon src={project.icon_url} />
      </ProjectColumnLeft>
      <ProjectColumnRight>
        <Link href={`/projects/${project.id}`}>
          {project.name}
        </Link>
      </ProjectColumnRight>
    </ProjectContainer>
  )
}

const ProjectIcon = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ProjectColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

const ProjectColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
