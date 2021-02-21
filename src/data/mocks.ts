import { Repository } from '@entities/repository.model'

export const repositorySample: Repository = {
  id: 'repo1',
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

export const repositories: Repository[] = [
  repositorySample,
  { ...repositorySample, id: 'repo2' },
  { ...repositorySample, id: 'repo3' },
  { ...repositorySample, id: 'repo4' },
  { ...repositorySample, id: 'repo5' },
  { ...repositorySample, id: 'repo6' }
]
