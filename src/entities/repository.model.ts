export interface Repository {
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
