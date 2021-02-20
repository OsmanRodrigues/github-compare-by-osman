import * as React from 'react'
import { InteractiveCard, ManagementToolbarComponent } from '@components'

export const App: React.FC = () => {
  return (
    <div className=".container-fluid-max-xl">
      <ManagementToolbarComponent />
      <div className="row">
        <div className="col-md-4">
          <InteractiveCard />
        </div>
      </div>
    </div>
  )
}
