import * as React from 'react'
import { InteractiveCard, ManagementToolbarComponent } from '@components'
import ClayLayout from '@clayui/layout'

const { ContainerFluid, Col, Row } = ClayLayout

export const App: React.FC = () => {
  return (
    <>
      <ManagementToolbarComponent />
      <ContainerFluid view={true}>
        <Row justify="start">
          {Array.from({ length: 6 }).map(item => (
            <Col xs={12} sm={6} md={6} lg={4} key={'card' + item}>
              <InteractiveCard />
            </Col>
          ))}
        </Row>
      </ContainerFluid>
    </>
  )
}
