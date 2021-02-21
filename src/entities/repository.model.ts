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
  Age = 'Age',
  Forks = 'Forks',
  LastCommit = 'LastCommit',
  OpenIssues = 'Open Issues',
  Starred = 'Starred',
  Stars = 'Stars'
}
