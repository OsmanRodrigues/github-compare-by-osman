import * as React from 'react'
import ClayButton, { ClayButtonWithIcon } from '@clayui/button'
import { ClayDropDownWithItems } from '@clayui/drop-down'
import { ClayInput } from '@clayui/form'
import ClayIcon from '@clayui/icon'
import ClayLabel from '@clayui/label'
import ClayManagementToolbar, {
  ClayResultsBar
} from '@clayui/management-toolbar'
import GitHubLogo from '@assets/img/github-logo.svg'
import ClayLink from '@clayui/link'
import { AppPath } from '../app-path'
import { ManagementToolbarComponentProps } from '@app/models/management-toolbar.model'

const path = AppPath

export const ManagementToolbarComponent: React.FC<ManagementToolbarComponentProps> = ({
  onSearchSubmit,
  onSearchTyping,
  searchValue
}) => {
  const filterItems = [
    { label: 'Filter Action 1', onClick: () => alert('Filter clicked') },
    { label: 'Filter Action 2', onClick: () => alert('Filter clicked') }
  ]

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
            items={filterItems}
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

      <ClayResultsBar>
        <ClayResultsBar.Item>
          <span className="component-text text-truncate-inline">
            <span className="text-truncate">
              {'2 results for "'}
              <strong>{'Red'}</strong>
              {'"'}
            </span>
          </span>
        </ClayResultsBar.Item>
        <ClayResultsBar.Item expand>
          <ClayLabel
            className="component-label tbar-label"
            displayType="unstyled"
          >
            {'Filter'}
          </ClayLabel>
        </ClayResultsBar.Item>
        <ClayResultsBar.Item>
          <ClayButton
            className="component-link tbar-link"
            displayType="unstyled"
          >
            {'Clear'}
          </ClayButton>
        </ClayResultsBar.Item>
      </ClayResultsBar>
    </>
  )
}
