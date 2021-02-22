import { DocumentNode, gql } from '@apollo/client/core'

const userName = process.env.REACT_APP_GITHUB_USER_NAME

export const QueryDocument = {
  GetRepositoryInfosDocument: (repositoryName: string): DocumentNode => gql`
    query {
      repository(owner:"${userName}", name:"${repositoryName}") {
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
