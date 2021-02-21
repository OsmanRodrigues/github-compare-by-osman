import { RepositoryProperties } from '@entities/repository.model'

export type ShowStarredOnlyHandler = (isShowing: boolean) => void

export interface ManagementToolbarComponentProps {
  searchValue: string
  onSearchTyping: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (searchValue: string) => void
  onFilterSubmit: (filterParam: keyof typeof RepositoryProperties) => void
  onFilterClear: () => void
  showStarredOnly: ShowStarredOnlyHandler
}

export type FilterItem = {
  label: RepositoryProperties
  onClick: () => void
}
