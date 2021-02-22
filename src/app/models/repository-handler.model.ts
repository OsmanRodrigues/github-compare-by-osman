import { Repository } from '@entities/repository.model'

export type RepositoryHandler = (repository?: Repository) => void
