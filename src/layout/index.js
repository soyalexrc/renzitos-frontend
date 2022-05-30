import Header from './Header'
import Footer from './Footer'
import {Container} from "@mui/material";

export default function Layout({children}) {
  return (
    <>
    <Header />
      <Container>
        {children}
      </Container>
    <Footer />
    </>
  )
}
