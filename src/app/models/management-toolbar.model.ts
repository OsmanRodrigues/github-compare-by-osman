import { RepositoryProperties } from '@entities/repository.model'

export interface ManagementToolbarComponentProps {
  searchValue: string
  onSearchTyping: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (searchValue: string) => void
  onFilterSubmit: (filterParam: keyof typeof RepositoryProperties) => void
  onFilterClear: () => void
}

export type FilterItem = {
  label: RepositoryProperties
  onClick: () => void
}
