import React from "react";
import { Card, CardGroup, Row, Col, Container } from "react-bootstrap";
import imgDolar from "../static/dolarf.png";
import imgAlum from "../static/alumno.png";
import imgServicio from "../static/servicio.png";
import imgCalendario from "../static/calendario.png";
import { Link } from "react-router-dom";

// import conexion from '../services/conexion'

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Primera aplicacion React",
    };
  }
  render() {
    return (
        <div className="container ">
          <div className="row justify-content-md-center">
            <div className="col-12">
              <CardGroup>
                <Card style={{ borderColor: "#6c1d45" }}>
                  <Card.Img
                    variant="top"
                    src={imgServicio}
                    style={{
                      width: "40%",
                      height: "40%",
                      alignSelf: "center",
                    }}
                  />
                  <Card.Body>
                    <Card.Title >Servicios educativos</Card.Title>
                    <Card.Text style ={{ 
                        margin: 0,
                        fontSize: 12,
                        // backgroundColor: 'red',
                        textTransform: 'uppercase',
                        alignItems: 'center',

                     }}>
                      Nos permite agregar , habilitar o desabilitar un servicio
                      educativo
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <div className="d-grid gap-2">
                      <Link to="/Servicios" className="btn btn-outline-primary">
                        Ingresar
                      </Link>
                    </div>
                  </Card.Footer>
                </Card>

                <Card style={{ borderColor: "#6c1d45" }}>
                  <Card.Img
                    variant="top"
                    src={imgAlum}
                    style={{
                      width: "40%",
                      height: "40%",
                      alignSelf: "center",
                    }}
                  />

                  <Card.Body>
                    <Card.Title>Registrar alumno</Card.Title>
                    <Card.Text
                    style ={{ 
                      margin: 0,
                      fontSize: 12,
                      // backgroundColor: 'red',
                      textTransform: 'uppercase',
                      alignItems: 'center',

                   }}>
                      Nos permite dar de alta por primera vez a un alumno o
                      modificar sus datos
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <div className="d-grid gap-2">
                      <Link to="/Ingresos" className="btn btn-outline-primary">
                        Ingresar
                      </Link>
                    </div>
                  </Card.Footer>
                </Card>
                <Card style={{ borderColor: "#6c1d45" }}>
                  <Card.Img
                    variant="top"
                    src={imgDolar}
                    style={{
                      width: "40%",
                      height: "40%",
                      alignSelf: "center",
                    }}
                  />

                  <Card.Body>
                    <Card.Title>Pagos</Card.Title>
                    <Card.Text style ={{ 
                      margin: 0,
                      fontSize: 12,
                      // backgroundColor: 'red',
                      textTransform: 'uppercase',
                      alignItems: 'center',

                   }}>
                      Nos permite dar de alta la documentacion de los pagos, de los alumnos
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <div className="d-grid gap-2">
                      <Link to="/Pagos" className="btn btn-outline-primary">
                        Ingresar
                      </Link>
                    </div>
                  </Card.Footer>
                </Card>
                <Card style={{ borderColor: "#6c1d45" }}>
                  <Card.Img
                    variant="top"
                    src={imgCalendario}
                    style={{
                      width: "40%",
                      height: "40%",
                      alignSelf: "center",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>Inicio de cursos</Card.Title>
                    <Card.Text style ={{ 
                      margin: 0,
                      fontSize: 12,
                      // backgroundColor: 'red',
                      textTransform: 'uppercase',
                      alignItems: 'center',

                   }}>
                      Nos permite agregar las fechas de inicio de los cursos o
                      talleres
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <div className="d-grid gap-2">
                      <Link to="/IniciosCursos" className="btn btn-outline-primary">
                        Ingresar
                      </Link>
                    </div>
                  </Card.Footer>
                </Card>
              </CardGroup>
            </div>
            <div className="w-100 mt-6"></div>
            <div className="col-8">
              <CardGroup>

              </CardGroup>
            </div>
          </div>
        </div>
    );
  }
}

export default MainApp;
