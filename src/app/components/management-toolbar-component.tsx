import * as React from 'react'
import ClayButton, { ClayButtonWithIcon } from '@clayui/button'
import { ClayDropDownWithItems } from '@clayui/drop-down'
import { ClayInput } from '@clayui/form'
import ClayIcon from '@clayui/icon'
import ClayManagementToolbar, {
  ClayResultsBar
} from '@clayui/management-toolbar'
import ClayLink from '@clayui/link'
import GitHubLogo from '@assets/img/github-logo.svg'
import { AppPath } from '../app-path'
import {
  FilterItem,
  ManagementToolbarComponentProps
} from '../models/management-toolbar.model'
import { RepositoryProperties } from '@entities/repository.model'

const path = AppPath

export const ManagementToolbarComponent: React.FC<ManagementToolbarComponentProps> = ({
  onSearchSubmit,
  onSearchTyping,
  onFilterSubmit,
  onFilterClear,
  searchValue
}) => {
  const [filterParam, setFilterParam] = React.useState<RepositoryProperties>()
  const filterItems: FilterItem[] = Object.keys(RepositoryProperties).map(
    key => {
      const castingKey = key as keyof typeof RepositoryProperties
      const castingValue = RepositoryProperties[castingKey]
      return {
        label: castingValue,

        onClick: () => {
          setFilterParam(castingValue)
          onFilterSubmit(castingKey)
        }
      }
    }
  )

  const viewTypes = [
    {
      label: 'List',
      onClick: () => alert('Show view list'),
      symbolLeft: 'list'
    },
    {
      active: true,
      label: 'Table',
      onClick: () => alert('Show view table'),
      symbolLeft: 'table'
    },
    {
      label: 'Card',
      onClick: () => alert('Show view card'),
      symbolLeft: 'cards2'
    }
  ]

  const [searchMobile, setSearchMobile] = React.useState(false)

  const viewTypeActive = viewTypes.find(type => type.active)
  return (
    <>
      <ClayManagementToolbar style={{ color: '#6b6c7e' }}>
        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Item>
            <ClayLink
              href={path.Base}
              className="nav-link"
              displayType="unstyled"
            >
              <img src={GitHubLogo} />
            </ClayLink>
          </ClayManagementToolbar.Item>
          <ClayManagementToolbar.Item>
            <ClayLink
              href={path.Base}
              className="nav-link"
              displayType="unstyled"
            >
              <span className="navbar-breakpoint-down-d-none">
                <b>
                  <span className="navbar-text-truncate">
                    {'Github Compare'}
                  </span>
                </b>
              </span>
            </ClayLink>
          </ClayManagementToolbar.Item>

          <ClayDropDownWithItems
            items={[
              { label: 'ORDER BY', type: 'group' },
              { type: 'divider' },
              ...filterItems
            ]}
            trigger={
              <ClayButton className="nav-link" displayType="unstyled">
                <span className="navbar-breakpoint-down-d-none">
                  <span className="navbar-text-truncate">
                    {'Filter and Order'}
                  </span>

                  <ClayIcon
                    className="inline-item inline-item-after"
                    symbol="caret-bottom"
                  />
                </span>
                <span className="navbar-breakpoint-d-none">
                  <ClayIcon symbol="filter" />
                </span>
              </ClayButton>
            }
          />
        </ClayManagementToolbar.ItemList>

        <ClayManagementToolbar.Search showMobile={searchMobile}>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                placeholder="Search"
                aria-label="Search"
                className="form-control input-group-inset input-group-inset-after"
                type="text"
                onKeyDown={event => {
                  if (event.key.length === 1) {
                    onSearchSubmit(searchValue + event.key)
                  } else if (event.key === 'Backspace') {
                    const previousValue = searchValue.substring(
                      0,
                      searchValue.length - 1
                    )
                    onSearchSubmit(previousValue)
                  } else if (event.key === 'Enter') {
                    event.preventDefault()
                  }
                }}
                value={searchValue}
                onChange={onSearchTyping}
              />
              <ClayInput.GroupInsetItem after tag="span">
                <ClayButtonWithIcon
                  className="navbar-breakpoint-d-none"
                  displayType="unstyled"
                  onClick={() => setSearchMobile(false)}
                  symbol="times"
                />
                <ClayButtonWithIcon
                  displayType="unstyled"
                  symbol="search"
                  type="submit"
                  onClick={event => {
                    event.preventDefault()
                    onSearchSubmit(searchValue)
                  }}
                />
              </ClayInput.GroupInsetItem>
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayManagementToolbar.Search>

        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Item className="navbar-breakpoint-d-none">
            <ClayButton
              className="nav-link nav-link-monospaced"
              displayType="unstyled"
              onClick={() => setSearchMobile(true)}
            >
              <ClayIcon symbol="search" />
            </ClayButton>
          </ClayManagementToolbar.Item>

          <ClayManagementToolbar.Item>
            <ClayButton
              className="nav-link nav-link-monospaced"
              displayType="unstyled"
              onClick={() => {
                console.log('nav link clicked')
              }}
            >
              <ClayIcon symbol="star-o" />
            </ClayButton>
          </ClayManagementToolbar.Item>

          <ClayManagementToolbar.Item>
            <ClayButton
              className="nav-link nav-link-monospaced"
              displayType="unstyled"
              onClick={() => {
                console.log('nav link clicked')
              }}
            >
              <ClayIcon symbol="adjust" />
            </ClayButton>
          </ClayManagementToolbar.Item>

          <ClayManagementToolbar.Item>
            <ClayDropDownWithItems
              items={viewTypes}
              trigger={
                <ClayButton
                  className="nav-link-monospaced nav-link"
                  displayType="unstyled"
                >
                  <ClayIcon
                    symbol={viewTypeActive ? viewTypeActive.symbolLeft : ''}
                  />
                </ClayButton>
              }
            />
          </ClayManagementToolbar.Item>

          <ClayManagementToolbar.Item>
            <ClayButtonWithIcon
              className="nav-btn nav-btn-monospaced"
              symbol="plus"
            />
          </ClayManagementToolbar.Item>
        </ClayManagementToolbar.ItemList>
      </ClayManagementToolbar>

      {filterParam && (
        <ClayResultsBar>
          <ClayResultsBar.Item>
            <span className="component-text text-truncate-inline">
              <span className="text-truncate">
                {'Ordering by '}
                <strong>{filterParam}</strong>
              </span>
            </span>
          </ClayResultsBar.Item>
          <ClayResultsBar.Item expand={true} />
          <ClayResultsBar.Item>
            <ClayButton
              onClick={() => {
                setFilterParam(undefined)
                onFilterClear()
              }}
              className="component-link tbar-link"
              displayType="unstyled"
            >
              {'Clear'}
            </ClayButton>
          </ClayResultsBar.Item>
        </ClayResultsBar>
      )}
    </>
  )
}
