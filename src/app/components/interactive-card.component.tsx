import * as React from 'react'
import ClayCard from '@clayui/card'
import ClayIcon from '@clayui/icon'
import ClayLabel from '@clayui/label'
import ClayList from '@clayui/list'
import { ClayButtonWithIcon } from '@clayui/button'
import { InteractiveCardProps } from '@app/models/interactive-card.model'

const InteractiveCardList = ClayList
InteractiveCardList.defaultProps = { style: { margin: 0 } }
InteractiveCardList.Item.defaultProps = {
  style: { padding: '14px 6px' },
  flex: true
}
ClayCard.Caption.defaultProps = { style: { fontSize: 14 } }

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  data,
  onDeleteHandler,
  onStarredHandler
}) => {
  // const [value, setValue] = React.useState(false)

  return (
    <ClayCard displayType="file">
      <InteractiveCardList>
        <InteractiveCardList.Item>
          <InteractiveCardList.ItemField>
            <InteractiveCardList.ItemTitle>
              <ClayIcon symbol="repository" />
            </InteractiveCardList.ItemTitle>
          </InteractiveCardList.ItemField>
          <InteractiveCardList.ItemField expand={true}>
            <InteractiveCardList.ItemTitle>
              {`${data.owner}/${data.name}`}
            </InteractiveCardList.ItemTitle>
          </InteractiveCardList.ItemField>
          <InteractiveCardList.ItemField>
            <ClayButtonWithIcon
              onClick={onStarredHandler}
              symbol={data?.starred ? 'star' : 'star-o'}
              displayType="unstyled"
            />
          </InteractiveCardList.ItemField>
          <InteractiveCardList.ItemField>
            <ClayButtonWithIcon
              onClick={onDeleteHandler}
              symbol="trash"
              displayType="unstyled"
            />
          </InteractiveCardList.ItemField>
        </InteractiveCardList.Item>
      </InteractiveCardList>
      <ClayCard.Body>
        <ClayCard.Row>
          <div className="autofit-col autofit-col-expand">
            <section className="autofit-section">
              <ClayCard.Caption>
                <b>{'Stars '}</b>
                {data.stars}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Forks '}</b>
                {data.forks}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Open Issues '}</b>
                {data.openIssues}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Age '}</b>
                {data.age.toLocaleString()}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Last commit '}</b>
                {data.lastCommit.toLocaleString()}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'License '}</b>
                {data.license}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <ClayLabel displayType="warning">{data.tags}</ClayLabel>
              </ClayCard.Caption>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  )
}
