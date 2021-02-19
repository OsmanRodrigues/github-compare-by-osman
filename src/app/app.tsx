import { InteractiveCard, ManagementToolbarComponent } from '@components'
import * as React from 'react'

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
