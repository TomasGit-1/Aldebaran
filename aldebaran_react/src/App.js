import React  from 'react'
import NavbarMain from './Components/NavbarS'
import FooterMain from './Components/Footer'
import Menu from './Components/Menu'
import {Container} from 'react-bootstrap';

export default function App() {
  return (
    <div style={{ width: '100%' , height:"100vh"}}>
      <NavbarMain/>
      <Container style={{ marginTop:100 , marginBottom:80 }}>
        <Menu/>
      </Container>
      {/* <FooterMain/> */}
    </div>
  );
}