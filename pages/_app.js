import React, { useContext } from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import UserObjContext, { UserObjProvider } from '../src/contextAPI/UserObjContext'
import wrapper from '../store/configureStore'

function MyApp({ Component, pageProps }) {
  const [userObj, setUserObj] = useContext(UserObjContext)
  return (
    <div id="main">
      <UserObjProvider value={userObj, setUserObj}>
        <Component {...pageProps} />
      </UserObjProvider>
    </div>
  )
}

export default wrapper.withRedux(MyApp)