import React , {Fragment} from 'react'
import NavbarMain from './Components/NavbarS'
import Menu from './Components/Menu'
import {Container} from 'react-bootstrap';

export default function App() {
  return (
    <div>
      <NavbarMain/>
      <Container className="mt-5">
        <Menu/>
      </Container>
    </div>
  );
}