export type SearchEvent = React.KeyboardEvent<HTMLInputElement>
// | React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface ManagementToolbarComponentProps {
  searchValue: string
  onSearchTyping: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (searchValue: string) => void
}
