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

export type AnnouncementQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type AnnouncementQuery = { __typename?: 'Query', announcement: { __typename?: 'Announcement', id: number, fellowship: string, title: string, body: string } };

export type NewsfeedQueryVariables = Exact<{
  fellowship: Fellowship;
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type NewsfeedQuery = { __typename?: 'Query', newsfeed: Array<{ __typename?: 'NewsfeedItem', id: number, type: string, announcement?: { __typename?: 'Announcement', id: number, fellowship: string, title: string, body: string } | null, project?: { __typename?: 'Project', id: number, name: string, description: string, icon_url: string } | null, user?: { __typename?: 'User', id: number, name: string, bio: string, fellowship: string, avatar_url: string } | null }> };

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: number, name: string, description: string, icon_url: string, users: Array<{ __typename?: 'User', id: number, name: string, avatar_url: string }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, name: string, bio: string, fellowship: string, avatar_url: string, projects: Array<{ __typename?: 'Project', id: number, name: string, icon_url: string }> } };


export const AnnouncementDocument = gql`
    query announcement($id: Int!) {
  announcement(id: $id) {
    id
    fellowship
    title
    body
  }
}
    `;

/**
 * __useAnnouncementQuery__
 *
 * To run a query within a React component, call `useAnnouncementQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnouncementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnouncementQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnnouncementQuery(baseOptions: Apollo.QueryHookOptions<AnnouncementQuery, AnnouncementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AnnouncementQuery, AnnouncementQueryVariables>(AnnouncementDocument, options);
      }
export function useAnnouncementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnnouncementQuery, AnnouncementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AnnouncementQuery, AnnouncementQueryVariables>(AnnouncementDocument, options);
        }
export type AnnouncementQueryHookResult = ReturnType<typeof useAnnouncementQuery>;
export type AnnouncementLazyQueryHookResult = ReturnType<typeof useAnnouncementLazyQuery>;
export type AnnouncementQueryResult = Apollo.QueryResult<AnnouncementQuery, AnnouncementQueryVariables>;
export const NewsfeedDocument = gql`
    query newsfeed($fellowship: Fellowship!, $offset: Int!, $limit: Int!) {
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
export const ProjectDocument = gql`
    query project($id: Int!) {
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
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const UserDocument = gql`
    query user($id: Int!) {
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
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;