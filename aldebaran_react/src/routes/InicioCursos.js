import React from "react";
import axios from "axios";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  ButtonGroup,
  Table,
  Dropdown,
  CloseButton,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Moment from "moment";
import NavbarMain from "../Components/NavbarS";
import $ from "jquery";
import config from "../config/config.json";
import download from "downloadjs";
import { StyleSheet } from "@react-pdf/renderer";

class InicioCursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mgs: "",
      showForm: false,
      showTable: true,
      showisUpdate: false,
      dateStart: "",
      servicioEducativoOpc: "",
      servicioEducativoID: "",
      servicio: [],
      dateArray: [],
      idInicioCurso : ""
    };
    this.filterInput = this.filterInput.bind(this);
    this.ShowForm = this.ShowForm.bind(this);
    this.serviciosHabilitados = this.serviciosHabilitados.bind(this);
    this.onServicio = this.onServicio.bind(this);
    this.apiGetDates = this.apiGetDates.bind(this);
    this.formularioSetData = this.formularioSetData.bind(this);
    this.editar = this.editar.bind(this);
    this.getDataUpdate = this.getDataUpdate.bind(this);

  }
  componentDidMount() {
    this.serviciosHabilitados();
    this.apiGetDates();
  }
  apiGetDates = async () => {
    const response = await fetch(
      config.general[0].url +
        config.general[0].puerto_api +
        "/api/getInicioCursos"
    );
    var responseJson = await response.json();
    var temp = responseJson;
    if (temp["status"] === 200) {
      let arrayFull = [];
      responseJson = responseJson["data"]["Info"];
      for (let index = 0; index < responseJson.length; index++) {
        let arrayTemp = [];
        let row = responseJson[index];
        arrayTemp.push(row.idiniciocurso);
        arrayTemp.push(row.registro_academico);
        arrayTemp.push(row.programa_academico);
        var fechaInicio = new Moment(row.fecha_inicio).format("DD/MM/YYYY");
        arrayTemp.push(fechaInicio);
        let ishabilitado =row.habilitado_curso === true ? "Habilitado" : "Deshabilitado";
        arrayTemp.push(ishabilitado);
        arrayTemp.push(row.fecha_inicio);
        arrayFull.push(arrayTemp);
      }
      this.setState({ dateArray: arrayFull });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: temp["data"],
      });
    }
  };
  filterInput() {
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }
  ShowForm(num, isActualizar) {
    if (isActualizar) {
      this.setState({
        showForm: false,
        showTable: false,
        showisUpdate: true,
      });
      this.getDataUpdate(num);
    } else {
      if (num === 1) {
        this.setState({
          showForm: true,
          showTable: false,
          showisUpdate: false,
        });
      } else if (num === 0) {
        this.setState({
          showForm: false,
          showTable: true,
          showisUpdate: false,
        });
      }
    }
  }
  getDataUpdate = async (data) => {
    this.setState({idInicioCurso : data})
    var url = config.general[0].url + config.general[0].puerto_api + "/Api/getUpdateFecha";
    var bodyFormData = new FormData();
    bodyFormData.append('idFecha', data);
    const respuesta = await axios({
        method: 'POST',
        url: url,
        data: bodyFormData,
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: error.message,
        })
    })

    var row = respuesta["data"][0];      
    var fecha_inicio = new Moment(row.fecha_inicio).format('YYYY-MM-DD');

    this.setState({ dateStart: fecha_inicio});
    this.setState({ servicioEducativoID: row.idserviciosedufk});
    // this.setState({ referencia: pagos.referencia});
  }
  onServicio(event) {
    var select = parseInt(event.target.value);
    var servicios = this.state.servicio;
    console.log(select);
    for (let index = 0; index < servicios.length; index++) {
      if (servicios[index][0] === select) {
        let array = [];
        for (let i = 0; i < servicios[index][7]; i++) {
          array.push(i + 1);
        }

        // this.setState({ numModuloPago: array });
        // this.setState({ cantidadPago: servicios[index][5] });
        this.setState({ servicioEducativoOpc: servicios[index][3] });
        this.setState({ servicioEducativoID: select });

        break;
      }
    }
  }
  validarFormulario(isUpdate = false) {
    if (isUpdate) {
      let campos = new Map();
      // campos.set("Servicio educativo", this.state.servicioEducativoOpc);
      campos.set("Fecha de Inicio", this.state.numeroModuloOpc);
      let msg = "";
      for (let clave of campos.keys()) {
        let valor = campos.get(clave);
        if (valor === null || valor === "" || valor === false) {
          msg = `El campo :${clave} esta vacio`;
          break;
        }
      }
      if (msg === "") {
        this.SendDataUpdate();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: msg,
        });
      }
    } else {
      let campos = new Map();
      campos.set("Servicio educativo", this.state.servicioEducativoOpc);
      campos.set("Fecha de Inicio", this.state.dateStart);
      let msg = "";
      for (let clave of campos.keys()) {
        let valor = campos.get(clave);
        if (valor === null || valor === "" || valor === false) {
          msg = `El campo :${clave} esta vacio`;
          break;
        }
      }
      if (msg === "") {
        this.SendData();

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: msg,
        });
      }
    }
  }
  SendDataUpdate() {
    var url =
      config.general[0].url +
      config.general[0].puerto_api +
      "/api/UpdateFecha";
    var bodyFomrData = new FormData();
    bodyFomrData.append("ServicioEducativo", this.state.servicioEducativoOpc);
    bodyFomrData.append("idServicioEducativo", this.state.servicioEducativoID);
    bodyFomrData.append("dateInicio", this.state.dateStart);
    bodyFomrData.append("idCurso", this.state.idInicioCurso);
    Swal.fire({
      title: "¿Actualizar informacion?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: url,
          data: bodyFomrData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response["data"]["status"] === 200) {
              // this.apiGetPagos();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Datos actualizados",
                showConfirmButton: false,
                timer: 500,
              });
              this.setState({
                showForm: false,
                showTable: true,
                showisUpdate: false,
              });
              setTimeout(window.location.reload(false), 7000);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops..",
                text: response["data"]["data"],
              });
            }
          })
          .catch(function (e) {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: e,
            });
          });
      }
    });
  }
  SendData() {
    var url =
      config.general[0].url +
      config.general[0].puerto_api +
      "/api/CrearInicioCursos";
    var bodyFomrData = new FormData();
    bodyFomrData.append("ServicioEducativo", this.state.servicioEducativoOpc);
    bodyFomrData.append("idServicioEducativo", this.state.servicioEducativoID);
    bodyFomrData.append("dateInicio", this.state.dateStart);
    Swal.fire({
      title: "¿Agregar un Inicio de curso?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "POST",
          url: url,
          data: bodyFomrData,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response["data"]["status"] === 200) {
              // this.apiGetPagos();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Datos agregados",
                showConfirmButton: false,
                timer: 500,
              });
              this.setState({
                showForm: false,
                showTable: true,
                showisUpdate: false,
              });
              setTimeout(window.location.reload(false), 7000);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops..",
                text: response["data"]["data"],
              });
            }
          })
          .catch(function (e) {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: e,
            });
          });
      }
    });
  }
  serviciosHabilitados = async () => {
    try {
      var Servicios = [];
      const response = await fetch(
        config.general[0].url +
          config.general[0].puerto_api +
          "/api/ServiciosLista"
      );
      var responseJson = await response.json();
      var temp = responseJson;

      if (temp["status"] === 200) {
        var responseData = responseJson["data"];
        for (var i = 0; i < responseData.length; i++) {
          if (responseData[i].habilitado === true) {
            var tempArray = [];
            tempArray.push(responseData[i].idserviciosedu);
            tempArray.push(responseData[i].registro_academico);
            tempArray.push(responseData[i].tipo_evento);
            tempArray.push(responseData[i].programa_academico);
            tempArray.push(responseData[i].modalidad);
            tempArray.push(responseData[i].cuota);
            tempArray.push(responseData[i].habilitado);
            tempArray.push(responseData[i].nummodulo);
            tempArray.push(responseData[i].numhoras);

            Servicios.push(tempArray);
          }
        }
        // var curpData = responseJson['Curp'];
        // this.setState({curpData : curpData})
        // this.setState({ id: id });
        this.setState({ servicio: Servicios });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: temp["data"],
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: e,
      });
    }
  };
  formularioSetData = (event, data) => {
    switch (data) {
      case "FechaInicio":
        this.setState({ dateStart: event.target.value });
        break;
      default:
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "No se encuentra la opción",
        });
    }
  };
  editar(b) {
    console.log(b);
    var msg = "";
    var opcion = false;
    // if (b[4] === "Habilitado") {
    //   msg = "¿Desahabilitar el servicio?";
    //   opcion = false;
    // } else {
    //   msg = "¿Habilitar el servicio?";
    //   opcion = true;
    // }
    let  data = b;
    msg = ( (b[4] === "Habilitado") ? "¿Desahabilitar la fecha ?" :  "¿Habilitar la fecha?" )
    
    Swal.fire({
      title: msg,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        
       axios
          .post(
            config.general[0].url +
              config.general[0].puerto_api +
              "/api/updateHabilitadoFechas",
            {
             data,
            }
          )
          .then((res) => {
            this.serviciosHabilitados();
            this.apiGetDates();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Fecha modificada",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(function (e) {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: e,
            });
          });
      }
    });
  }
  render() {
    let { showTable } = this.state;
    let { showForm } = this.state;
    let { showisUpdate } = this.state;
    let { servicio } = this.state;
    let { dateArray } = this.state;

    const styles = StyleSheet.create({
      buttonSend: {
        backgroundColor: "#00a01b ",
        color: " #000",
        border: "none",
        height: 45,
      },
      buttonClose: {
        // backgroundColor:"#600101 ",
        color: "red",
        border: "none",
        height: 45,
      },
    });
    return (
      <main>
        <header>
          <NavbarMain />
        </header>
        {showForm ? (
          <section style={{ marginTop: 80 }}>
            <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Cerrar</Tooltip>}
              >
                <CloseButton
                  style={styles.buttonClose}
                  onClick={() => window.location.reload(false)}
                />
                {/* <Button variant="success">Hover me to see</Button> */}
              </OverlayTrigger>
              <Form>
                <div
                  className="alert mt-2"
                  role="alert"
                  style={{ background: " #ceac00", color: "#000" }}
                >
                  Incio de cursos
                </div>
                <Row className="mt-3">
                  <Col sm>
                    <Form.Group controlId="formFile">
                      <Form.Label className="h6 ">
                        Servicio educativo{" "}
                        <small style={{ color: "#600101" }}>*</small>{" "}
                      </Form.Label>
                      <Form.Select onChange={this.onServicio}>
                        <option value="Seleccione una opcion">
                          Seleccione una opción
                        </option>
                        {servicio.map(function (item) {
                          return (
                            <option key={item[0]} value={item[0]}>
                              {item[3] + " / " + item[1]}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group className="mb-3">
                      <Form.Label className="h6">
                        Fecha de Inicio{" "}
                        <small style={{ color: "#600101" }}>*</small>{" "}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={this.state.dateStart}
                        onChange={(evt) =>
                          this.formularioSetData(evt, "FechaInicio")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3 ">
                  <Col sm>
                    <Button
                      className="col-6"
                      variant="secondary"
                      onClick={() => this.validarFormulario(false)}
                    >
                      <i className="bi bi-plus-circle-fill "></i>
                      &nbsp;&nbsp; Enviar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </section>
        ) : null}

{showisUpdate ? (
          <section style={{ marginTop: 80 }}>
            <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">Cerrar</Tooltip>}
              >
                <CloseButton
                  style={styles.buttonClose}
                  onClick={() => window.location.reload(false)}
                />
                {/* <Button variant="success">Hover me to see</Button> */}
              </OverlayTrigger>
              <Form>
                <div
                  className="alert mt-2"
                  role="alert"
                  style={{ background: " #ceac00", color: "#000" }}
                >
                  Incio de cursos
                </div>
                <Row className="mt-3">
                  <Col sm>
                    <Form.Group controlId="formFile">
                      <Form.Label className="h6 ">
                        Servicio educativo{" "}
                        <small style={{ color: "#600101" }}>*</small>{" "}
                      </Form.Label>
                      <Form.Select onChange={this.onServicio} value={this.state.servicioEducativoID}>
                        {/* <option value="Seleccione una opcion">
                          Seleccione una opcion
                        </option> */}
                        {servicio.map(function (item) {
                          return (
                            <option key={item[0]} value={item[0]}>
                              {item[3] + " / " + item[1]}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm>
                    <Form.Group className="mb-3">
                      <Form.Label className="h6">
                        Fecha de Inicio{" "}
                        <small style={{ color: "#600101" }}>*</small>{" "}
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={this.state.dateStart}
                        onChange={(evt) =>
                          this.formularioSetData(evt, "FechaInicio")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3 ">
                  <Col sm>
                    <Button
                      className="col-6"
                      variant="secondary"
                      onClick={() => this.validarFormulario(true)}
                    >
                      <i className="bi bi-plus-circle-fill "></i>
                      &nbsp;&nbsp; Actualizar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </section>
        ) : null}
        {showTable ? (
          <section style={{ marginTop: 80 }}>
            <section>
              <Container className="mt-3 mb-3"></Container>
            </section>
            <Container className="mt-3 mb-3 border border-2 shadow-sm p-3 mb-5 bg-body rounded p-2">
              <h3>Inicio de Cursos</h3>
              <Row className="mt-3 mb-3">
                <Col>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="secondary"
                      onClick={() => this.ShowForm(1, false)}
                    >
                      Nuevo Fecha &nbsp;&nbsp;
                      <i className="bi bi-plus-circle-fill "></i>
                    </Button>
                  </ButtonGroup>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Buscar"
                    id="myInput"
                    onChange={this.filterInput}
                  ></input>
                </Col>
              </Row>
              {dateArray.length === 0 ? (
                <Container className="mb-3">
                  <div className="alert alert-danger mt-2" role="alert">
                    No hay registro de fechas
                  </div>
                </Container>
              ) : null}
              <div className="table-responsive " style={{ height: "500px" }}>
                <Table
                  className="table-hover"
                  id="myTable"
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Registro académico </th>
                      <th>Nombre del programa académico</th>
                      <th>Fecha de inicio</th>
                      <th>Estatus</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dateArray.map((index) => (
                      <tr key={index}>
                        <td>{index[0]}</td>
                        <td>{index[1]}</td>
                        <td>{index[2]}</td>
                        <td>{index[3]}</td>
                        <td>{index[4]}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              id="dropdown-basic"
                              variant="secondary"
                            >
                              <i className="bi bi-three-dots-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                              <Dropdown.Item
                                onClick={() => this.ShowForm(index[0], true)}
                              >
                                {/* <Button onClick={() => this.editar(index)}><i className="bi bi-pencil"></i></Button> */}
                                <i className="bi bi-pencil"></i>{" "}
                                &nbsp;&nbsp;Editar
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => this.editar(index)}>
                                {index[4] === "Habilitado" ? (
                                  <label>
                                    <i className="bi bi-toggle-off"></i>
                                    &nbsp;&nbsp;Deshabilitar
                                  </label>
                                ) : (
                                  <label>
                                    <i className="bi bi-toggle-on"></i>
                                    &nbsp;&nbsp;Habilitar
                                  </label>
                                )}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Container>
          </section>
        ) : null}
      </main>
    );
  }
}

export default InicioCursos;
