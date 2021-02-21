import { gql } from '@apollo/client/core'

export const RepositoryInfosQuery = gql`
  query {
    repository(owner: "OsmanRodrigues", name: "metaliflix") {
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
