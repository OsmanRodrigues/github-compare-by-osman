import { Repository } from '@entities/repository.model'

export const repositorySample: Repository = {
  age: new Date(),
  forks: 442,
  openIssues: 0,
  lastCommit: new Date(),
  license: 'N/A',
  name: 'liferay-portal',
  owner: 'liferay',
  stars: 150,
  tags: 'javascript'
}

export const repositories = [
  repositorySample,
  repositorySample,
  repositorySample,
  repositorySample,
  repositorySample,
  repositorySample
]
