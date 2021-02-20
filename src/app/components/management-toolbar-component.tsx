import * as React from 'react'
import ClayButton, { ClayButtonWithIcon } from '@clayui/button'
import { ClayDropDownWithItems } from '@clayui/drop-down'
import { ClayCheckbox, ClayInput } from '@clayui/form'
import ClayIcon from '@clayui/icon'
import ClayLabel from '@clayui/label'
import ClayManagementToolbar, {
  ClayResultsBar
} from '@clayui/management-toolbar'

export const ManagementToolbarComponent: React.FC = () => {
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
      <ClayManagementToolbar>
        <ClayManagementToolbar.ItemList>
          <ClayManagementToolbar.Item>
            <ClayIcon
              className="inline-item inline-item-after"
              symbol="caret-bottom"
            />
          </ClayManagementToolbar.Item>
          <ClayManagementToolbar.Item>
            <h1>Github Compare</h1>
          </ClayManagementToolbar.Item>
          <ClayManagementToolbar.Item>
            <ClayCheckbox
              checked={false}
              onChange={() => {
                console.log('check box clicked')
              }}
            />
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

          <ClayManagementToolbar.Item>
            <ClayButton
              className="nav-link nav-link-monospaced order-arrow-down-active"
              displayType="unstyled"
              onClick={() => {
                console.log('nav link clicked')
              }}
            >
              <ClayIcon symbol="order-arrow" />
            </ClayButton>
          </ClayManagementToolbar.Item>
        </ClayManagementToolbar.ItemList>

        <ClayManagementToolbar.Search showMobile={searchMobile}>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                aria-label="Search"
                className="form-control input-group-inset input-group-inset-after"
                defaultValue="Red"
                type="text"
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
              <ClayIcon symbol="info-circle-open" />
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
