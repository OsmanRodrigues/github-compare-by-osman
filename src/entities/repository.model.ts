interface FooRepository {
  name: string
  owner: string
  stars: number
  forks: number
  openIssues: number
  age: number
  lastCommit: number
  license: 'N/A' | 'MIT'
  tags: string
}

interface AbstractRepository {
  createdAt: string
  forkCount: number
  issues: { totalCount: number }
  licenseInfo: string | null
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
