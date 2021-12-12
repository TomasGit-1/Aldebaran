import React from "react";
import { Card, Button, CardGroup } from "react-bootstrap";
import imgDolar from "../static/alumno.png";
import imgAlum from "../static/dolarf.png";
import imgServicio from "../static/servicio.png";
import { Link  } from "react-router-dom";
import NavbarMain from './NavbarS'
import { Fragment } from "react";


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
            <main>
                <CardGroup>
                    <Card style={{ borderColor: "#A80000" }}>
                        <Card.Img
                            variant="top"
                            src={imgServicio}
                            style={{ width: "200px", height: "200px", alignSelf: "center" }}
                        />
                        <Card.Body>
                            <Card.Title>Servicios Educativos</Card.Title>
                            <Card.Text>
                                Nos permite agregar , habilitar o desabilitar un servicio
                                educativo
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <div className="d-grid gap-2">
                                <Link to="/Servicios" className="btn btn-outline-primary">Ingresar</Link>
                            </div>
                        </Card.Footer>
                    </Card>

                    <Card style={{ borderColor: "#A80000" }}>
                        <Card.Img
                            variant="top"
                            src={imgAlum}
                            style={{ width: "200px", height: "200px", alignSelf: "center" }}
                        />

                        <Card.Body>
                            <Card.Title>Registrar alumno</Card.Title>
                            <Card.Text>
                                Nos permite dar de alta por primera vez a un alumno o modificar
                                , los datos de los alumnos
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <div className="d-grid gap-2">
                                <Link to="/Ingresos" className="btn btn-outline-primary">Ingresar</Link>

                            </div>
                        </Card.Footer>
                    </Card>

                    <Card style={{ borderColor: "#A80000" }}>
                        <Card.Img
                            variant="top"
                            src={imgDolar}
                            style={{ width: "200px", height: "200px", alignSelf: "center" }}
                        />

                        <Card.Body>
                            <Card.Title>Pagos</Card.Title>
                            <Card.Text>
                                Nos permite agregar la documentacion de los pagos , a los cursos
                                que los alumnos se inscriban
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <div className="d-grid gap-2">
                                <Link to="/Pagos" className="btn btn-outline-primary">Ingresar</Link>
                            </div>
                        </Card.Footer>
                    </Card>
                </CardGroup>
            </main>
        );
    }
}

export default MainApp;
