import * as React from 'react'
import { ManagementToolbarComponent } from 'components'

export const App: React.FC = () => {
  return (
    <div className=".container-fluid-max-xl">
      <ManagementToolbarComponent />
      <div className="autofit-row autofit-padded">
        <div className="autofit-col autofit-padded"></div>
      </div>
    </div>
  )
}
