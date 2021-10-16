import Top from '../components/Top'
import Footer from "../components/Footer"


const PublicLayout = ({ children }) => {
  return (
    <>
      <Top />
      { children }
      <Footer />
    </>
  )
}

export default PublicLayout