import * as React from 'react'
import ClayCard from '@clayui/card'
import ClayIcon from '@clayui/icon'
import ClayLabel from '@clayui/label'
import ClayList from '@clayui/list'
import { ClayButtonWithIcon } from '@clayui/button'
import { InteractiveCardProps } from '@app/models/interactive-card.model'
import { dateConversor } from '@tools/date-conversor.tool'

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
              {`${data.nameWithOwner}`}
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
                {data.stargazerCount}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Forks '}</b>
                {data.forkCount}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Open Issues '}</b>
                {data.issues.totalCount}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Age '}</b>
                {dateConversor.getLabel(data.createdAt)}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'Last commit '}</b>
                {dateConversor.getLabel(data.pushedAt)}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <b>{'License '}</b>
                {data?.licenseInfo || 'N/A'}
              </ClayCard.Caption>
              <ClayCard.Caption>
                <ClayLabel displayType="warning">
                  {data.primaryLanguage.name}
                </ClayLabel>
              </ClayCard.Caption>
            </section>
          </div>
        </ClayCard.Row>
      </ClayCard.Body>
    </ClayCard>
  )
}
