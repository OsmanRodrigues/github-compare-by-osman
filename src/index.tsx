/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@app/app'
import '@clayui/css/lib/css/atlas.css'
import spriteMap from '@assets/icons/sprite.svg'
import { ClayIconSpriteContext } from '@clayui/icon'
import { ApolloConsumer, ApolloProvider } from '@apollo/client'
import { client } from '@adapters/apollo.client'

ReactDOM.render(
  <React.StrictMode>
    <ClayIconSpriteContext.Provider value={spriteMap}>
      <ApolloProvider client={client}>
        <ApolloConsumer>{client => <App />}</ApolloConsumer>
      </ApolloProvider>
    </ClayIconSpriteContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
