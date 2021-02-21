import { RepositoryProperties } from '@entities/repository.model'

export type ShowStarredOnlyHandler = (isShowing: boolean) => void

export interface ManagementToolbarComponentProps {
  searchValue: string
  newRepositoryNotFound?: boolean
  onAddRepository: (newRepositoryName: string) => void
  onSearchTyping: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (searchValue: string) => void
  onFilterSubmit: (filterParam: keyof typeof RepositoryProperties) => void
  onFilterClear: () => void
  onShowStarredOnly: ShowStarredOnlyHandler
}

export type FilterItem = {
  label: RepositoryProperties
  onClick: () => void
}
