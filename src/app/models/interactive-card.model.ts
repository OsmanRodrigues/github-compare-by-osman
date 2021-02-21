import { Repository } from '@entities/repository.model'

export interface InteractiveCardProps {
  data: Repository
  onDeleteHandler: () => void
  onStarredHandler: () => void
}
