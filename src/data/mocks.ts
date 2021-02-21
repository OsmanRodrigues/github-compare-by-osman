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
  { ...repositorySample, id: 'repo2', starred: true, name: 'liferay-business' },
  { ...repositorySample, id: 'repo3', name: 'liferay-community' },
  { ...repositorySample, id: 'repo4', starred: true },
  { ...repositorySample, id: 'repo5', name: 'liferay-design' },
  {
    ...repositorySample,
    id: 'repo6',
    starred: true,
    name: 'liferay-development'
  }
]
