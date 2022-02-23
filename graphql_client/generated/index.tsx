import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Announcement = {
  __typename?: 'Announcement';
  body: Scalars['String'];
  created_ts: Scalars['String'];
  fellowship: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updated_ts: Scalars['String'];
};

export enum Fellowship {
  Angels = 'angels',
  Founders = 'founders',
  Writers = 'writers'
}

export type NewsfeedItem = {
  __typename?: 'NewsfeedItem';
  announcement?: Maybe<Announcement>;
  created_ts: Scalars['String'];
  id: Scalars['Int'];
  project?: Maybe<Project>;
  type: Scalars['String'];
  user?: Maybe<User>;
};

export type Project = {
  __typename?: 'Project';
  created_ts: Scalars['String'];
  description: Scalars['String'];
  icon_url: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updated_ts: Scalars['String'];
  users: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  announcement: Announcement;
  newsfeed: Array<NewsfeedItem>;
  project: Project;
  user: User;
};


export type QueryAnnouncementArgs = {
  id: Scalars['Int'];
};


export type QueryNewsfeedArgs = {
  fellowship: Fellowship;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar_url: Scalars['String'];
  bio: Scalars['String'];
  created_ts: Scalars['String'];
  fellowship: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  projects: Array<Project>;
  updated_ts: Scalars['String'];
};

export type SingleAnnouncementQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SingleAnnouncementQuery = { __typename?: 'Query', announcement: { __typename?: 'Announcement', id: number, fellowship: string, title: string, body: string } };

export type NewsfeedQueryVariables = Exact<{
  fellowship: Fellowship;
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type NewsfeedQuery = { __typename?: 'Query', newsfeed: Array<{ __typename?: 'NewsfeedItem', id: number, type: string, announcement?: { __typename?: 'Announcement', id: number, fellowship: string, title: string, body: string } | null, project?: { __typename?: 'Project', id: number, name: string, description: string, icon_url: string } | null, user?: { __typename?: 'User', id: number, name: string, bio: string, fellowship: string, avatar_url: string } | null }> };

export type SingleProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SingleProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: number, name: string, description: string, icon_url: string, users: Array<{ __typename?: 'User', id: number, name: string, avatar_url: string }> } };

export type SingleUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SingleUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, name: string, bio: string, fellowship: string, avatar_url: string, projects: Array<{ __typename?: 'Project', id: number, name: string, icon_url: string }> } };


export const SingleAnnouncementDocument = gql`
    query SingleAnnouncement($id: Int!) {
  announcement(id: $id) {
    id
    fellowship
    title
    body
  }
}
    `;

/**
 * __useSingleAnnouncementQuery__
 *
 * To run a query within a React component, call `useSingleAnnouncementQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleAnnouncementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleAnnouncementQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleAnnouncementQuery(baseOptions: Apollo.QueryHookOptions<SingleAnnouncementQuery, SingleAnnouncementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleAnnouncementQuery, SingleAnnouncementQueryVariables>(SingleAnnouncementDocument, options);
      }
export function useSingleAnnouncementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleAnnouncementQuery, SingleAnnouncementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleAnnouncementQuery, SingleAnnouncementQueryVariables>(SingleAnnouncementDocument, options);
        }
export type SingleAnnouncementQueryHookResult = ReturnType<typeof useSingleAnnouncementQuery>;
export type SingleAnnouncementLazyQueryHookResult = ReturnType<typeof useSingleAnnouncementLazyQuery>;
export type SingleAnnouncementQueryResult = Apollo.QueryResult<SingleAnnouncementQuery, SingleAnnouncementQueryVariables>;
export const NewsfeedDocument = gql`
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
    `;

/**
 * __useNewsfeedQuery__
 *
 * To run a query within a React component, call `useNewsfeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsfeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsfeedQuery({
 *   variables: {
 *      fellowship: // value for 'fellowship'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useNewsfeedQuery(baseOptions: Apollo.QueryHookOptions<NewsfeedQuery, NewsfeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsfeedQuery, NewsfeedQueryVariables>(NewsfeedDocument, options);
      }
export function useNewsfeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsfeedQuery, NewsfeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsfeedQuery, NewsfeedQueryVariables>(NewsfeedDocument, options);
        }
export type NewsfeedQueryHookResult = ReturnType<typeof useNewsfeedQuery>;
export type NewsfeedLazyQueryHookResult = ReturnType<typeof useNewsfeedLazyQuery>;
export type NewsfeedQueryResult = Apollo.QueryResult<NewsfeedQuery, NewsfeedQueryVariables>;
export const SingleProjectDocument = gql`
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
    `;

/**
 * __useSingleProjectQuery__
 *
 * To run a query within a React component, call `useSingleProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleProjectQuery(baseOptions: Apollo.QueryHookOptions<SingleProjectQuery, SingleProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleProjectQuery, SingleProjectQueryVariables>(SingleProjectDocument, options);
      }
export function useSingleProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleProjectQuery, SingleProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleProjectQuery, SingleProjectQueryVariables>(SingleProjectDocument, options);
        }
export type SingleProjectQueryHookResult = ReturnType<typeof useSingleProjectQuery>;
export type SingleProjectLazyQueryHookResult = ReturnType<typeof useSingleProjectLazyQuery>;
export type SingleProjectQueryResult = Apollo.QueryResult<SingleProjectQuery, SingleProjectQueryVariables>;
export const SingleUserDocument = gql`
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
    `;

/**
 * __useSingleUserQuery__
 *
 * To run a query within a React component, call `useSingleUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSingleUserQuery(baseOptions: Apollo.QueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, options);
      }
export function useSingleUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleUserQuery, SingleUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleUserQuery, SingleUserQueryVariables>(SingleUserDocument, options);
        }
export type SingleUserQueryHookResult = ReturnType<typeof useSingleUserQuery>;
export type SingleUserLazyQueryHookResult = ReturnType<typeof useSingleUserLazyQuery>;
export type SingleUserQueryResult = Apollo.QueryResult<SingleUserQuery, SingleUserQueryVariables>;