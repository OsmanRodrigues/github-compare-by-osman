export interface Repository {
  id: string
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
