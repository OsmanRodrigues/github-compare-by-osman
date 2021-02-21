import { Repository } from '@entities/repository.model'

export const repositorySample: Repository = {
  id: 'repo1',
  age: new Date().getMilliseconds(),
  forks: 442,
  openIssues: 0,
  lastCommit: new Date().getMilliseconds(),
  license: 'N/A',
  name: 'liferay-portal',
  owner: 'liferay',
  stars: 150,
  tags: 'javascript'
}

export const repositories: Repository[] = [
  repositorySample,
  {
    ...repositorySample,
    stars: 75,
    id: 'repo2',
    starred: true,
    name: 'liferay-business'
  },
  { ...repositorySample, stars: 90, id: 'repo3', name: 'liferay-community' },
  { ...repositorySample, stars: 500, id: 'repo4', starred: true },
  { ...repositorySample, stars: 12, id: 'repo5', name: 'liferay-design' },
  {
    ...repositorySample,
    stars: 350,
    id: 'repo6',
    starred: true,
    name: 'liferay-development'
  }
]
