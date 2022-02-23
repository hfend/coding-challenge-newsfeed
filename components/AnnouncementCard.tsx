import Link from 'next/link'
import Card from './Card'
import Markdown from './Markdown'

import type { Announcement } from "graphql_client/generated"

export interface AnnouncementLite extends Pick<Announcement, 'id'|'title'|'fellowship'|'body'> {}

type Props = {
  announcement: AnnouncementLite;
}

export default function AnnouncementCard({announcement}: Props) {
  return (
    <Card>
      <h2><Link href={`/announcements/${announcement.id}`}>{announcement.title}</Link></h2>
      <p>Fellowship: {announcement.fellowship}</p>
      <Markdown>{announcement.body}</Markdown>
    </Card>
  )
}
