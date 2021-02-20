import * as React from 'react'
import { InteractiveCard, ManagementToolbarComponent } from './components'
import ClayLayout from '@clayui/layout'
// import { repositories } from '@data/mocks'
import ClayEmptyState from '@clayui/empty-state'
import NoData from '@assets/img/no-data-empty-state.gif'
import NotFound from '@assets/img/not-found-empty-state.png'
import { Repository } from '@entities/repository.model'
import { AppStrings } from './app-strings'

const { ContainerFluid, Col, Row } = ClayLayout

const repositories: Repository[] = []

interface EmptyState {
  isEmpty: boolean
  type: 'no-data' | 'search-result' | null
}

const strings = AppStrings

export const App: React.FC = () => {
  const [emptyState, setEmptyState] = React.useState<EmptyState>({
    isEmpty: !repositories?.length,
    type: 'search-result' //! repositories?.length ? 'no-data' : null
  })

  const emptyStateProps =
    emptyState.type === 'no-data'
      ? { ...strings.EmptyState.NoData }
      : { ...strings.EmptyState.NotFound }

  return (
    <>
      <ManagementToolbarComponent />
      <ContainerFluid view={true}>
        <Row justify="start">
          {emptyState.isEmpty && <ClayEmptyState {...emptyStateProps} />}
          {!emptyState.isEmpty &&
            repositories.map((repository, index) => (
              <Col xs={12} sm={6} md={6} lg={4} key={repository?.name + index}>
                <InteractiveCard data={repository} />
              </Col>
            ))}
        </Row>
      </ContainerFluid>
    </>
  )
}
