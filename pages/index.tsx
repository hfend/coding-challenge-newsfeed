import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"
import {useQuery, gql, NetworkStatus} from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useRouter } from "next/router";
import Head from 'next/head'

import Card from 'components/Card'
import Layout from 'components/Layout'
import Newsfeed from 'components/Newsfeed'

import { useNewsfeedQuery } from "graphql_client/generated"
import { Fellowship } from "graphql_client/generated"


// TODO
// - Inifnite scroll (pagination must be reflected in query args)
// - N+1 queries problem
// - View As switch (implement as state and note that if it has to be re-used it better be moved to a context that's persisted in a cookie or in local storage)

type fellowship = "founders" | "angels" | "writers"

const PER_PAGE = 10  // TODO move to a better place

gql`
  query Newsfeed($fellowship: Fellowship!, $offset: Int!, $limit: Int!) {
    newsfeed(fellowship: $fellowship, offset: $offset, limit: $limit) {

      id
      type
      announcement {
        id
        fellowship
        title
        body
      }
      project {
        id
        name
        description
        icon_url
      }
      user {
        id
        name
        bio
        fellowship
        avatar_url
      }
    }
  }
`

// TODO validate queryFellowship, cookieFellowship, queryPage

function Home() {

  const { query, push } = useRouter()

  // Setup fellowship and page state
  let queryFellowship: Fellowship | undefined = undefined
  if (query['fellowship'] && typeof query['fellowship'] === 'string') {
    queryFellowship = query['fellowship'] as Fellowship
  }

  let queryPage: number | undefined = undefined
  if (query['page'] && typeof query['page'] === 'string') {
    queryPage = Number(query['page'])
  }

  const [cookies, setCookie] = useCookies(["fellowship"])
  const cookieFellowship = cookies['fellowship']

  const [fellowship, setFellowship] = useState<Fellowship>(queryFellowship || cookieFellowship || 'founders');
  const [page, setPage] = useState<number>(/*queryPage !== undefined ?  queryPage :*/ 1);
  const [endReached, setEndReached] = useState<boolean>(false);

  useEffect(() => {
    setCookie('fellowship', fellowship, {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    })
    setPage(1)
    setEndReached(false)
    push(
      {
        pathname: '/',
        query: { ...query/*, page*/, fellowship }
      },
      undefined,
      { shallow: true }
    )
    refetch({
      fellowship,
      offset: (1 - 1) * PER_PAGE,
      limit: PER_PAGE
    })
  }, [/*page,*/ fellowship])

  // Query newsfeed
  const {data, error, loading, fetchMore, refetch, networkStatus} = useNewsfeedQuery(
    {
      skip: !fellowship || page === undefined,
      notifyOnNetworkStatusChange: true,
      variables: {
        fellowship,
        offset: (page - 1) * PER_PAGE,
        limit: PER_PAGE
      },
    }
  )

  const loadingMore = networkStatus === NetworkStatus.fetchMore

  const newsfeed = data?.newsfeed;

  // event handlers
  const handleFellowshipSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFellowship(event.target.value as Fellowship)
  }

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(Number(event.target.value)) // TODO validate
  }

  const handleLoadMore = () => {
    if (!endReached) {
      setPage(page + 1)
      fetchMore({
        variables: {
          offset: ((page + 1) - 1) * PER_PAGE
        }
      })
      .then((result) => {
        if (!result.data.newsfeed.length) {
          setEndReached(true)
        }
      })
    }
  }

  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>

      <Card>
        <h2>On Deck Newsfeed 🚀</h2>
        <p>
          View as: <select value={fellowship} onChange={handleFellowshipSelect} disabled={loading || loadingMore} >
            <option value={Fellowship.Founders}>Founder</option>
            <option value={Fellowship.Angels}>Angel</option>
            <option value={Fellowship.Writers}>Writer</option>
          </select>
        </p>
        <p>
          Page: <input type="number" value={page} onChange={handlePageChange} disabled={loading || loadingMore} />
        </p>

        {loading && (
          <span>Loading..</span>
        )}

        {!loading && !!error && (
          <p>{String(error)}</p>
        )}

        {!loading && !error && !newsfeed && (
          <p>No entries found.</p>
        )}

        {!loading && !error && !!newsfeed && (
          <Newsfeed
            data={newsfeed}
            loadingMore={loadingMore}
            handleLoadMore={handleLoadMore}
            endReached={endReached}
          />
        )}

      </Card>

    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // TODO validate
//   const cookieFellowship = context.req.cookies['fellowship']
//   const queryFellowship = context.query['fellowship']
//   const queryPage = context.query['page']

//   return {
//     props: {
//       propFellowship: queryFellowship || cookieFellowship || 'founders',
//       propPage: queryPage || 1
//     } as Props
//   }
// }

export default Home
