interface AbstractRepository {
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

export interface Repository extends AbstractRepository {
  id: string
  starred?: boolean
}

export enum RepositoryProperties {
  Stars = 'Stars',
  Forks = 'Forks',
  OpenIssues = 'Open Issues',
  Age = 'Age',
  LastCommit = 'LastCommit'
}
