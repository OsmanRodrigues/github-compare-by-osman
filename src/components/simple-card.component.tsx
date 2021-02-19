import * as React from 'react'
import { ClayCardWithInfo } from '@clayui/card'

export const InteractiveCard: React.FC = () => {
  const [value, setValue] = React.useState(false)

  return (
    <ClayCardWithInfo
      actions={[
        {
          label: 'clickable',
          onClick: () => {
            alert('you clicked!')
          }
        },
        { type: 'divider' },
        {
          href: '#',
          label: 'linkable'
        }
      ]}
      description="A cool description"
      href="#"
      labels={[
        {
          displayType: 'success',
          value: 'Awesome'
        },
        {
          displayType: 'danger',
          value: 'Crazy'
        }
      ]}
      onSelectChange={newVal => setValue(newVal)}
      selected={value}
      spritemap={'spritemap'}
      stickerProps={{
        content: 'DOC',
        displayType: 'danger'
      }}
      title="Selectable File"
    />
  )
}
