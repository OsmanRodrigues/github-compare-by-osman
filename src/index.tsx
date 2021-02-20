import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@app/app'
import '@clayui/css/lib/css/atlas.css'
import spriteMap from '@assets/icons/sprite.svg'
import { ClayIconSpriteContext } from '@clayui/icon'

ReactDOM.render(
  <React.StrictMode>
    <ClayIconSpriteContext.Provider value={spriteMap}>
      <App />
    </ClayIconSpriteContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
