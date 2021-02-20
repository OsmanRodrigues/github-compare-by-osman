import * as React from 'react'
import { Repository } from '@entities/repository.model'
import ClayCard from '@clayui/card'
import ClayIcon from '@clayui/icon'
import ClayLabel from '@clayui/label'

interface InteractiveCardProps {
  data: Repository
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({ data }) => {
  const [value, setValue] = React.useState(false)
  console.log(data)
  return (
    <ClayCard displayType="file">
      <div className="card-header">
        <ClayCard.Row style={{ justifyContent: 'space-between' }}>
          <ClayCard.Description displayType="title">
            {'deliverable.doc'}
          </ClayCard.Description>
          <ClayCard.Description displayType="subtitle">
            {'Stevie Ray Vaughn'}
          </ClayCard.Description>
          <ClayCard.Description displayType="subtitle">
            {'Stevie Ray Vaughn'}
          </ClayCard.Description>
        </ClayCard.Row>
      </div>
      <ClayCard.Body>
        <ClayCard.Row>
          <div className="autofit-col autofit-col-expand">
            <section className="autofit-section">
              <ClayCard.Description displayType="title">
                {'deliverable.doc'}
              </ClayCard.Description>
              <ClayCard.Description displayType="subtitle">
                {'Stevie Ray Vaughn'}
              </ClayCard.Description>
              <ClayCard.Caption>
                <ClayLabel displayType="warning">{'Approved'}</ClayLabel>
              </ClayCard.Caption>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  )
}
