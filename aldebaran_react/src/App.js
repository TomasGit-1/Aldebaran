import React , {Fragment} from 'react'
import NavbarMain from './Components/NavbarS'
import FormularioC from './Components/FormularioC'
function App() {
  return (
      <Fragment>
        <NavbarMain brand = "Ejemplo React" ></NavbarMain>
        <div className="container mt-5">
          <div className="row">
            <FormularioC/>
          </div>
        </div>
      </Fragment>
  );
}

export default App;
