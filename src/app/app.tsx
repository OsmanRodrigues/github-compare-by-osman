import * as React from 'react'
import { InteractiveCard, ManagementToolbarComponent } from './components'
import ClayLayout from '@clayui/layout'
import { repositories } from '@data/mocks'

const { ContainerFluid, Col, Row } = ClayLayout

export const App: React.FC = () => {
  return (
    <>
      <ManagementToolbarComponent />
      <ContainerFluid view={true}>
        <Row justify="start">
          {repositories.map((repository, index) => (
            <Col xs={12} sm={6} md={6} lg={4} key={repository?.name + index}>
              <InteractiveCard data={repository} />
            </Col>
          ))}
        </Row>
      </ContainerFluid>
    </>
  )
}
