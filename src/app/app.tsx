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

  const handleOnOpenModal = (repository: Repository) => {
    setCurrentActionRepository(repository)
    setModalVisible(true)
  }

  const handleOnDeleteRepository = (repository?: Repository) => {
    if (repository) {
      const currentRepositories = repositories

      setRepositories(
        currentRepositories.filter(
          currentRepository => currentRepository.id !== repository.id
        )
      )
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
                  repositoryDeleteHandler={() => handleOnOpenModal(repository)}
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
          Are you sure to delete the <b>{currentActionRepository?.name}</b>{' '}
          repository?
        </p>
      </Modal>
    </>
  )
}
