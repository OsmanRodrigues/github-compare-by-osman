export interface EmptyState {
  isEmpty: boolean
  type: 'no-data' | 'search-result' | null
}

export interface EmptyStateProps {
  description: string
  imgProps: { alt: string; title: string }
  imgSrc: string
  title: string
}
