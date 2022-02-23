import React, { useEffect, useRef } from 'react'

import { useIsVisible } from 'utils/hooks'

import Button from 'components/Button'
import AnnouncementCard from 'components/AnnouncementCard'
import ProjectCard from 'components/ProjectCard'
import UserCard from 'components/UserCard'


type fellowship = "founders" | "angels" | "writers"

type Announcement = {
  id: number;
  fellowship: string;
  title: string;
  body: string;
}

type Project = {
  id: number;
  name: string;
  description: string;
  icon_url: string;
  users: User[];
}

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: fellowship;
  avatar_url: string;
  projects: Project[];
}

type NewsfeedItem = {
  id: number;
  type: "Announcement" | "Project" | "User";
  announcement: Announcement | null
  project: Project | null
  user: User | null
}

type Props = {
  data: NewsfeedItem[];
  handleLoadMore: Function;
  loadingMore: boolean;
  endReached: boolean;
}


export default function Newsfeed({ data, handleLoadMore, loadingMore, endReached }: Props) {

  const loadMoreRef = useRef(null)
  const isLoadMoreVisible = useIsVisible(loadMoreRef, {
    rootMargin: '100px 0px 100px 0px'
  })
  const prevIsLoadMoreVisible = useRef({ isLoadMoreVisible }).current;

  useEffect(() => {
    if (prevIsLoadMoreVisible.isLoadMoreVisible !== isLoadMoreVisible && isLoadMoreVisible && !loadingMore) {
        handleLoadMore()
    }
    prevIsLoadMoreVisible.isLoadMoreVisible = isLoadMoreVisible
  }, [isLoadMoreVisible])

  return (
    <>
        {data.map(item => {
            switch (item.type) {
            case 'Announcement':
                return <AnnouncementCard announcement={item.announcement} key={`${item.type}-${item.id}`} />
            case 'Project':
                return <ProjectCard project={item.project} key={`${item.type}-${item.id}`} />
            case 'User':
                return <UserCard user={item.user} key={`${item.type}-${item.id}`} />
            }
        })}
        <Button
            ref={loadMoreRef}
            onClick={() => handleLoadMore()}
            disabled={loadingMore || endReached}
        >{endReached?'No more entries 🤷':(loadingMore?'Loading more..':'Load more')}</Button>
    </>
  )
}
