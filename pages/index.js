import { useEffect, useCallback, useState, useContext } from 'react'
// import { authService, dbService } from '../src/fbase'
// import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
// import UserObjContext from '../src/contextAPI/UserObjContext'
// import Head from 'next/head'
// import Footer from '../src/index/component/Footer'
// import Top from '../src/index/component/Top'
// import Main from '../src/index/component/Main'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import { SIGN_UP_REQUEST } from '../reducers/auth'
import Router from 'next/router'
import { authService, dbService, fbase } from '../src/fbase'

const Home = () => {

  const { isSignedUp, signUpError } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onClick = useCallback(() => {
    console.log(email, password)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email: email, password: password },
    })
  }, [email, password])

  // const onClick = useCallback(() => {
  //   console.log(email, password)
  //   authService.createUserWithEmailAndPassword(email, password)
  //   .then((userCredential) => {
  //     const user = userCredential.user
  //     console.log(user);
  //   })
  // }, [email, password])

  useEffect(() => {
    if(isSignedUp) {
      Router.replace('/')
    }
  }, [isSignedUp])

  useEffect(() => {
    if(signUpError) {
      alert(signUpError)
    }
  }, [signUpError])

  return (
    <>
      <h1>회원가입 폼</h1>
      <input name="user-email" value={email} onChange={onChangeEmail} />
      <input name="user-password" value={password} onChange={onChangePassword} />
      <button onClick={onClick}>회원가입</button>
    </>
  )
}




// const Home = () => {
//   const [init, setInit] = useState(false)
//   const [userObj, setUserObj] = useContext(UserObjContext)

//   useEffect(() => {
//     authService.onAuthStateChanged((user) => {
//       if(user) {
//         const docRef = dbService.collection('whole_users').doc(user.uid)
//         docRef.get().then((doc) => {
//           if(doc.exists) {
//             setUserObj({
//               ...userObj,
//               name: doc.data().name,
//               displayName: doc.data().displayName,
//               uid: doc.data().uid,
//               photoURL: doc.data().photoURL,
//               joinedDate: doc.data().joined_date,
//               introduce: doc.data().introduce
//             })
//           }
//         })
//       }
//       setInit(true)
//     })
//   }, [])

//   return (
//     <>
//     <Head>
//       <title>Play. &</title>
//       <meta name="description" content="BBABBA의 홈입니다."></meta>
//     </Head>
//     {
//     init ?
//     <>
//       <Top />
//       <Main />
//       <Footer />
//     </>
//     :
//     <Segment className="loading">
//       <Dimmer active>
//         <Loader size="huge">Loading</Loader>
//       </Dimmer>

//       <Image src='/images/wireframe/short-paragraph.png' />
//     </Segment>
//     }
//     </>
//   )
// }

export default Home