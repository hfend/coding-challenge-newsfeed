import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie"
import { gql, NetworkStatus} from '@apollo/client'
import { useRouter } from "next/router";
import Head from 'next/head'
import queryString from 'query-string'

import Card from 'components/Card'
import Layout from 'components/Layout'
import Newsfeed from 'components/Newsfeed'

import { useNewsfeedQuery } from "graphql_client/generated"
import { Fellowship } from "graphql_client/generated"


const PER_PAGE = 10

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

// TODO validate queryFellowship, cookieFellowship

function Home() {

  const { query, push, asPath } = useRouter()

  // Setup fellowship and page state
  let queryFellowship: Fellowship | undefined = undefined
  const queryArgs = queryString.parse(
    asPath.slice(1,asPath.length)  // slice is for removing the leading slash
  );
  if (queryArgs['fellowship'] && typeof queryArgs['fellowship'] === 'string') {
    queryFellowship = queryArgs['fellowship'] as Fellowship
  }
  
  const [cookies, setCookie] = useCookies(["fellowship"])
  const cookieFellowship = cookies['fellowship']

  const [fellowship, setFellowship] = useState<Fellowship>(queryFellowship || cookieFellowship || 'founders');
  const [page, setPage] = useState<number>(1);
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
        query: { ...query, fellowship }
      },
      undefined,
      { shallow: true }
    )
    refetch({
      fellowship,
      offset: (1 - 1) * PER_PAGE,
      limit: PER_PAGE
    })
  }, [fellowship])

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

export default Home
