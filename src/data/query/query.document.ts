import { DocumentNode, gql } from '@apollo/client/core'

const userName = process.env.REACT_APP_GITHUB_USER_NAME

export const QueryDocument = {
  GetRepositoryInfosDocument: (params: {
    repositoryName: string
    userName?: string
  }): DocumentNode => gql`
    query {
      repository(
        owner:"${params?.userName || userName}", name:"${params.repositoryName}"
        ) {
        id
        nameWithOwner
        forkCount
        stargazerCount
        issues {
          totalCount
        }
        createdAt
        pushedAt
        licenseInfo {
          name
        }
        primaryLanguage {
          name
          color
        }
      }
    }
  `
}
