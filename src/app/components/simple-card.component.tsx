import * as React from 'react'
import { ClayCardWithInfo } from '@clayui/card'
import { Repository } from '@entities/repository.model'

interface InteractiveCardProps {
  data: Repository
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({ data }) => {
  const [value, setValue] = React.useState(false)
  console.log(data)
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
