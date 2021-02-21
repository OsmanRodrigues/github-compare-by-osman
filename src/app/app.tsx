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
import { Repository, RepositoryProperties } from '@entities/repository.model'
import { AppStrings } from './app-strings'
import { EmptyState, EmptyStateProps } from './models/empty-state.model'
import { RepositoryHandler } from './models/repository-handler'
import { ShowStarredOnlyHandler } from './models/management-toolbar.model'

const { ContainerFluid, Col, Row } = ClayLayout

const strings = AppStrings

export const App: React.FC = () => {
  const repositoriesRef = React.useRef(mockedRepositories)
  const [repositories, setRepositories] = React.useState(
    repositoriesRef.current
  )
  const [newRepositoryNotFound, setNewRepositoryNotFound] = React.useState(
    false
  )
  const [currentActionRepository, setCurrentActionRepository] = React.useState<{
    repository: Repository | undefined
    actionState?: string
  }>({
    repository: undefined,
    actionState: ''
  })

  const [modalVisble, setModalVisible] = React.useState(false)
  const { observer: modalObserver, onClose } = useModal({
    onClose: () => setModalVisible(false)
  })

  const initialEmptyState: EmptyState = {
    isEmpty: !mockedRepositories?.length,
    type: !mockedRepositories?.length ? 'no-data' : null
  }

  const [emptyState, setEmptyState] = React.useState<EmptyState>(
    initialEmptyState
  )

  const emptyStateProps: EmptyStateProps =
    emptyState.type === 'no-data'
      ? { ...strings.EmptyState.NoData }
      : { ...strings.EmptyState.NotFound }

  const [searchValue, setSearchValue] = React.useState('')

  const handleOnOpenModal: RepositoryHandler = repository => {
    setCurrentActionRepository({ repository })
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

  const handleOnSearchTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }

  const handleOnSearchSubmit = (searchString: string) => {
    const filteredRepositories = repositoriesRef.current.filter(repository =>
      String(`${repository.owner}/${repository.name}`).includes(searchString)
    )
    if (!filteredRepositories.length) {
      setEmptyState({ isEmpty: true, type: 'not-found' })
    } else {
      setRepositories(filteredRepositories)
      setEmptyState({ isEmpty: false, type: null })
    }
    setRepositories(filteredRepositories)
  }

  const handleOnFilterSubmit = (
    filterParam: keyof typeof RepositoryProperties
  ) => {
    const repositoriesCopy = repositories
    const orderedRepositories = repositoriesCopy.sort(
      (repositoryA, repositoryB) => {
        const keys = Object.keys(repositoryA) as Array<keyof typeof repositoryA>
        const repositoryProperty = keys.find(
          key => key.toLowerCase() === filterParam.toLowerCase()
        )
        const repositoryPropertyPlaceholder = repositoryProperty || 'stars'

        const repositoryAValue =
          repositoryPropertyPlaceholder === 'starred'
            ? repositoryA.stars
            : repositoryA[repositoryPropertyPlaceholder]
        const repositoryBValue =
          repositoryPropertyPlaceholder === 'starred'
            ? repositoryB.stars
            : repositoryB[repositoryPropertyPlaceholder]

        return repositoryBValue > repositoryAValue ? 1 : -1
      }
    )
    setRepositories([...orderedRepositories])
  }

  const handleOnFilterClear = () => {
    const repositoriesCopy = mockedRepositories
    const orderedRepositories = repositoriesCopy.sort(
      (repositoryA, repositoryB) => (repositoryA.id > repositoryB.id ? 1 : -1)
    )
    setRepositories([...orderedRepositories])
    setEmptyState(initialEmptyState)
  }

  const handleOnShowStarredOnly: ShowStarredOnlyHandler = isShowing => {
    const repositoriesCopy = repositories
    const filteredRepositories = repositoriesCopy.filter(
      repository => repository?.starred
    )

    if (isShowing) {
      handleOnFilterClear()
    } else {
      setEmptyState({
        isEmpty: !filteredRepositories?.length,
        type: filteredRepositories?.length ? null : 'not-found'
      })
      setRepositories([...filteredRepositories])
    }
  }

  const handleOnAddRepository = (newRepositoryName: string) => {
    setNewRepositoryNotFound(false)
    if (newRepositoryName) {
      const repositoriesCopy = repositories
      const newRepository = mockedRepositories.find(repository =>
        repository.name.includes(newRepositoryName)
      )

      if (newRepository) {
        setRepositories([newRepository, ...repositoriesCopy])
      } else {
        setNewRepositoryNotFound(true)
      }
    }
  }

  return (
    <>
      <ManagementToolbarComponent
        searchValue={searchValue}
        newRepositoryNotFound={newRepositoryNotFound}
        onAddRepository={handleOnAddRepository}
        onSearchTyping={handleOnSearchTyping}
        onSearchSubmit={handleOnSearchSubmit}
        onFilterSubmit={handleOnFilterSubmit}
        onFilterClear={handleOnFilterClear}
        onShowStarredOnly={handleOnShowStarredOnly}
      />
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
          handleOnDeleteRepository(currentActionRepository.repository)
        }
      >
        <p>
          Are you sure to delete the
          <b>{` ${currentActionRepository.repository?.name} `}</b>
          repository?
        </p>
      </Modal>
    </>
  )
}
