import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import wrapper from '../store/configureStore'
import Layout from '../src/layouts/Layout'

function MyApp({ Component, pageProps }) {

  return (
    <div id="main">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}

export default wrapper.withRedux(MyApp)