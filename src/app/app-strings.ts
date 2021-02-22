import NoData from '@assets/img/no-data-empty-state.gif'
import NotFound from '@assets/img/not-found-empty-state.png'
import { EmptyStateProps } from './models/empty-state.model'

export const AppStrings = {
  EmptyState: {
    NoData: <EmptyStateProps>{
      description: 'Add some repositories by clicking add new repository',
      imgProps: { alt: 'No one repository', title: 'No one repository' },
      imgSrc: NoData,
      title: 'There is still nothing here'
    },
    NotFound: <EmptyStateProps>{
      description: 'No results were found that matched',
      imgProps: { alt: 'Search not found', title: 'Search not found' },
      imgSrc: NotFound,
      title: 'Something went wrong!'
    }
  }
}
