import * as React from 'react'
import ClayLayout from '@clayui/layout'
import ClayEmptyState from '@clayui/empty-state'
import { useModal } from '@clayui/modal'
import {
  InteractiveCard,
  ManagementToolbarComponent,
  Modal
} from './components'
import {
  Repository,
  RepositoryProperties,
  RepositoryPropertiesDict
} from '@entities/repository.model'
import { AppStrings } from './app-strings'
import { EmptyState, EmptyStateProps } from './models/empty-state.model'
import { RepositoryHandler } from './models/repository-handler.model'
import { ShowStarredOnlyHandler } from './models/management-toolbar.model'
import { useLazyQuery } from '@apollo/client'
import { QueryDocument } from '@data/query/query.document'
import { NewRepositoryState } from './models/new-repository.model'

const { ContainerFluid, Col, Row } = ClayLayout
const strings = AppStrings
const document = QueryDocument

export const App: React.FC = () => {
  const repositoriesRef = React.useRef<Repository[]>([])
  const [repositories, setRepositories] = React.useState<Repository[]>([])
  const [newRepository, setNewRepository] = React.useState<NewRepositoryState>({
    name: '',
    notFound: false
  })
  const [
    currentActionRepository,
    setCurrentActionRepository
  ] = React.useState<Repository>()
  const [searchValue, setSearchValue] = React.useState('')

  const initialEmptyState: EmptyState = {
    isEmpty: !repositories.length,
    type: !repositories.length ? 'no-data' : null
  }
  const [emptyState, setEmptyState] = React.useState<EmptyState>(
    initialEmptyState
  )
  const emptyStateProps: EmptyStateProps =
    emptyState.type === 'no-data'
      ? { ...strings.EmptyState.NoData }
      : { ...strings.EmptyState.NotFound }

  const [modalVisble, setModalVisible] = React.useState(false)
  const { observer: modalObserver, onClose } = useModal({
    onClose: () => setModalVisible(false)
  })

  const splitedName = newRepository.name.split('/' || '')
  const queryParams = {
    repositoryName: splitedName?.[1] ? splitedName[1] : splitedName[0],
    userName: splitedName?.[1] ? splitedName[0] : ''
  }
  const getRepositoryDocument = document.GetRepositoryInfosDocument(queryParams)
  const [getRepositoryQuery, getRepositoryQueryResult] = useLazyQuery(
    getRepositoryDocument,
    {
      onCompleted: data => {
        repositoriesRef.current = [
          { ...data.repository, starred: false },
          ...repositoriesRef.current
        ]
        setRepositories([
          { ...data.repository, starred: false },
          ...repositories
        ])
        setEmptyState({ isEmpty: false, type: null })
      },
      onError: () => {
        setNewRepository({ name: '', notFound: true })
      }
    }
  )

  const handleOnAddRepository = (newRepositoryName: string) => {
    setNewRepository({ name: newRepositoryName, notFound: false })

    if (newRepositoryName) {
      getRepositoryQuery()
    }
  }
  const handleOnDeleteRepository: RepositoryHandler = repository => {
    const repositoriesCopy = repositories
    const filteredRepositories = repositoriesCopy.filter(
      currentRepository => currentRepository.id !== repository?.id
    )

    repositoriesRef.current = filteredRepositories
    setRepositories(filteredRepositories)
  }

  const handleOnSearchTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }
  const handleOnSearchSubmit = (searchString: string) => {
    const repositoriesCopy = repositoriesRef.current
    const filteredRepositories = repositoriesCopy.filter(repository =>
      String(`${repository.nameWithOwner}`).includes(searchString)
    )

    if (!filteredRepositories.length) {
      setEmptyState({ isEmpty: true, type: 'not-found' })
    } else {
      setRepositories(filteredRepositories)
      setEmptyState({ isEmpty: false, type: null })
    }
  }

  const handleOnFilterSubmit = (
    filterParam: keyof typeof RepositoryProperties
  ) => {
    const repositoriesCopy = repositoriesRef.current
    const orderedRepositories = repositoriesCopy.sort(
      (repositoryA, repositoryB) => {
        const keys = Object.keys(repositoryA) as Array<keyof typeof repositoryA>
        const repositoryProperty = keys.find(
          key => key.toLowerCase() === RepositoryPropertiesDict[filterParam] // put dict here
        )

        switch (repositoryProperty) {
          case 'stargazerCount' || 'starred':
            return repositoryB.stargazerCount > repositoryA.stargazerCount
              ? 1
              : -1
          case 'createdAt' || 'pushedAt':
            return new Date(repositoryB.createdAt).getMilliseconds() >
              new Date(repositoryA.createdAt).getMilliseconds()
              ? 1
              : -1
          case 'issues':
            return repositoryB.issues.totalCount > repositoryA.issues.totalCount
              ? 1
              : -1
          default:
            return repositoryB.stargazerCount > repositoryA.stargazerCount
              ? 1
              : -1
        }
      }
    )

    setRepositories(orderedRepositories)
  }
  const handleOnFilterClear = () => {
    const repositoriesCopy = repositoriesRef.current
    const orderedRepositories = repositoriesCopy.sort(
      (repositoryA, repositoryB) => (repositoryA.id > repositoryB.id ? 1 : -1)
    )

    setRepositories(orderedRepositories)
    setEmptyState(initialEmptyState)
  }

  const handleOnStarred: RepositoryHandler = repository => {
    if (repository) {
      const repositoriesCopy = repositories
      const filteredRepositories = repositoriesCopy.filter(
        currentRepository => currentRepository.id !== repository?.id
      )
      const updatedRepository = {
        ...repository,
        starred: !repository?.starred
      }
      const upadatedRepositories = [...filteredRepositories, updatedRepository]

      repositoriesRef.current = upadatedRepositories
      setRepositories(upadatedRepositories)
    }
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
      setRepositories(filteredRepositories)
    }
  }

  const handleOnOpenModal: RepositoryHandler = repository => {
    setCurrentActionRepository(repository)
    setModalVisible(true)
  }

  return (
    <>
      <ManagementToolbarComponent
        searchValue={searchValue}
        newRepositoryNotFound={newRepository.notFound}
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
          handleOnDeleteRepository(currentActionRepository)
        }
      >
        <p>
          Are you sure to delete the
          <b>{` ${currentActionRepository?.nameWithOwner} `}</b>
          repository?
        </p>
      </Modal>
    </>
  )
}
