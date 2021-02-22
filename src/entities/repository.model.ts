interface AbstractRepository {
  createdAt: string
  forkCount: number
  issues: { totalCount: number }
  licenseInfo: { name: string } | null
  nameWithOwner: string
  primaryLanguage: { color: string; name: string }
  pushedAt: string
  stargazerCount: number
}

export interface Repository extends AbstractRepository {
  id: string
  starred?: boolean
}

export enum RepositoryProperties {
  Stars = 'Stars',
  Forks = 'Forks',
  OpenIssues = 'Open Issues',
  Age = 'Age',
  LastCommit = 'Last Commit',
  Starred = 'Starred'
}

export enum RepositoryPropertiesDict {
  Stars = 'stargazerCount',
  Forks = 'forkCount',
  OpenIssues = 'issues',
  Age = 'createdAt',
  LastCommit = 'pushedAt',
  Starred = 'starred'
}
