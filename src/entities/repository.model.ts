interface AbstractRepository {
  name: string
  owner: string
  stars: number
  forks: number
  openIssues: number
  age: Date
  lastCommit: Date
  license: 'N/A' | 'MIT'
  tags: string
}

export interface Repository extends AbstractRepository {
  id: string
  starred?: boolean
}
