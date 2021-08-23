import React, { useContext } from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import wrapper from '../store/configureStore'
import Layout from '../src/layouts/Layout'
import UserObjContext, { UserObjProvider } from '../src/contextAPI/UserObjContext'

function MyApp({ Component, pageProps }) {
  // const [userObj, setUserObj] = useContext(UserObjContext)
  return (
    <div id="main">
      {/* <UserObjProvider value={userObj, setUserObj}> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </UserObjProvider> */}
    </div>
  )
}

export default wrapper.withRedux(MyApp)