import * as React from 'react'
import ClayLayout from '@clayui/layout'
import ClayEmptyState from '@clayui/empty-state'
import { useModal } from '@clayui/modal'
import {
  InteractiveCard,
  ManagementToolbarComponent,
  Modal
} from './components'
import { repositories as mockedRepositories } from '@data/mocks'
import { Repository } from '@entities/repository.model'
import { AppStrings } from './app-strings'
import { EmptyState, EmptyStateProps } from './models/empty-state.model'
import { RepositoryHandler } from './models/repository-handler'

const { ContainerFluid, Col, Row } = ClayLayout

const strings = AppStrings

export const App: React.FC = () => {
  const [repositories, setRepositories] = React.useState(mockedRepositories)
  const [
    currentActionRepository,
    setCurrentActionRepository
  ] = React.useState<Repository>()

  const [modalVisble, setModalVisible] = React.useState(false)
  const { observer: modalObserver, onClose } = useModal({
    onClose: () => setModalVisible(false)
  })

  const [emptyState, setEmptyState] = React.useState<EmptyState>({
    isEmpty: !repositories?.length,
    type: !repositories?.length ? 'no-data' : null
  })

  const emptyStateProps: EmptyStateProps =
    emptyState.type === 'no-data'
      ? { ...strings.EmptyState.NoData }
      : { ...strings.EmptyState.NotFound }

  const handleOnOpenModal: RepositoryHandler = repository => {
    setCurrentActionRepository(repository)
    setModalVisible(true)
  }

  const handleOnDeleteRepository: RepositoryHandler = repository => {
    // TODO: remove this workaround after integration
    const repositoriesCopy = repositories

    setRepositories(
      repositoriesCopy.filter(
        currentRepository => currentRepository.id !== repository?.id
      )
    )
  }

  const handleOnStarred: RepositoryHandler = repository => {
    // TODO: remove this workaround after integration
    if (repository) {
      const repositoriesCopy = repositories
      const filteredRepositories = repositoriesCopy.filter(
        currentRepository => currentRepository.id !== repository?.id
      )
      const unstarredRepository = {
        ...repository,
        starred: !repository?.starred
      }
      const upadatedRepositories = [
        ...filteredRepositories,
        unstarredRepository
      ]
      setRepositories(upadatedRepositories)
    }
  }

  return (
    <>
      <ManagementToolbarComponent />
      <ContainerFluid view={true}>
        <Row justify="start">
          {emptyState.isEmpty && <ClayEmptyState {...emptyStateProps} />}
          {!emptyState.isEmpty &&
            repositories.map(repository => (
              <Col xs={12} sm={6} md={6} lg={4} key={repository.id}>
                <InteractiveCard
                  onDeleteHandler={() => handleOnOpenModal(repository)}
                  onStarredHandler={() => handleOnStarred(repository)}
                  data={repository}
                />
              </Col>
            ))}
        </Row>
      </ContainerFluid>
      <Modal
        visible={modalVisble}
        observer={modalObserver}
        closeModalHandler={onClose}
        confirmActionModalHandler={() =>
          handleOnDeleteRepository(currentActionRepository)
        }
      >
        <p>
          Are you sure to delete the
          <b>{` ${currentActionRepository?.name} `}</b>
          repository?
        </p>
      </Modal>
    </>
  )
}
