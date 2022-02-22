import Link from 'next/link'
import Card from './Card'
import Markdown from './Markdown'

type Props = {
  announcement: Announcement;
}

type Announcement = {
  id: number;
  fellowship: string;
  title: string;
  body: string;
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
