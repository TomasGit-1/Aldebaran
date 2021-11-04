import React , {Fragment} from 'react'
import Navbar from './Components/Navbar'
import Formulario from './Components/Formulario'
function App() {
  return (
      <Fragment>
        <Navbar brand = "Ejemplo React" ></Navbar>
        <div className="container">
          <div className="row">
            <Formulario></Formulario>
          </div>
        </div>
      </Fragment>
  );
}

export default App;
