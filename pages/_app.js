import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import wrapper from '../store/configureStore'

function MyApp({ Component, pageProps }) {

  return (
    <div id="main">
      <Component {...pageProps} />
    </div>
  )
}

export default wrapper.withRedux(MyApp)