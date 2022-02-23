import React, { useEffect, useRef } from 'react'

import { useIsVisible } from 'utils/hooks'

import Button from 'components/Button'

import AnnouncementCard from 'components/AnnouncementCard'
import type {AnnouncementLite} from 'components/AnnouncementCard'

import ProjectCard from 'components/ProjectCard'
import type {ProjectLite} from 'components/ProjectCard'

import UserCard from 'components/UserCard'
import type {UserLite} from 'components/UserCard'

import type { NewsfeedItem } from "graphql_client/generated"

interface NewsfeedItemLite extends Pick<NewsfeedItem, 'id'|'type'> {
  announcement?: AnnouncementLite | null
  project?: ProjectLite | null
  user?: UserLite | null
}

type Props = {
  data: NewsfeedItemLite[];
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
                return (!!item.announcement && <AnnouncementCard announcement={item.announcement} key={`${item.type}-${item.id}`} />)
            case 'Project':
                return (!!item.project && <ProjectCard project={item.project} key={`${item.type}-${item.id}`} />)
            case 'User':
                return (!!item.user && <UserCard user={item.user} key={`${item.type}-${item.id}`} />)
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
