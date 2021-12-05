import React from 'react'
import {Card ,Nav ,Container , Tabs , Tab ,Sonnet} from 'react-bootstrap';
// import conexion from '../services/conexion'
import Formulario0 from './Formulario0'
import Formulario1 from './Formulario1'
import Formulario2 from './Formulario2'

class FormularioC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg : "Primera aplicacion React",
            titles:[
                {value : 0 ,text : "Datos personales"},
                {value : 1 ,text : "Formacion Academica"},
                {value : 2 ,text : "Datos laborales"},
                {value : 3 ,text : "Comprobantes de pago"},
                {value : 3 ,text : "Información Adicional"}
            ],
            show1:true,
            show2:false,
            show3:false
        };
        this.ShowForm = this.ShowForm.bind(this);
    }

    ShowForm (num) {
        if (num === 0) {
            this.setState({
                    show1: true,
                    show2: false,
                    show3: false
                });
        }
        if (num === 1) {
            this.setState({
                show1: false,
                show2: true,
                show3: false
            });
        }
        if (num === 2) {
            this.setState({
                show1: false,
                show2: false,
                show3: true
            });
        }
    }


    //!Importante este codigo se ejecuta cuando se Incia la app
    //Revisar el ciclo de vida
    // async componentDidMount () {
    //     const responseJson = await getInicio()
    //     console.log(responseJson)
    //     this.msg =responseJson
    // }

    render() {
        const { titles } = this.state
        let { show1 } = this.state
        let { show2 } = this.state
        let { show3 } = this.state
        return (
            <main>
                    <section>
                        <div style={{ border : '1px solid'}} className="mb-3">
                            <p style={{ align: 'justify' , padding:'5px' }}>
                                    El presente formulario tiene el objetivo de recabar los datos para realizar tu inscripción a los 
                                    Servicios Educativos del Centro de Vinculación y Desarrollo Regional Unidad Oaxaca, agradecemos
                                    llenes cada uno de los campos de forma correcta y verídica utilizando altas, bajas y acentos; 
                                    dado que estos datos serán los que aparecerán en tu documento probatorio al termino del curso.<br></br>
                                    Es importante que coloques tu correo electrónico de manera correcta, ya que a través de este medio 
                                    se llevará a cabo la comunicación y seguimiento del programa.
                                    <br></br>
                                    IMPORTANTE. Cabe señalar que la información proporcionada se tomará como cierta y definitiva para que tu proceso de registro sea exitoso. 
                            </p>
                        </div>
                    </section>
                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                        >
                        <Tab eventKey="home" title={titles[0].text}>
                            <Container fluid="md" className="bg-light shadow-sm p-3 mb-5 bg-white rounded">
                                <Formulario0/>
                            </Container> 

                        </Tab>
                        <Tab eventKey="Form1" title={titles[1].text +'/'+ titles[2].text}>
                            <Container fluid="md" className="bg-light shadow-sm p-3 mb-5 bg-white rounded">
                                <Formulario1/>
                            </Container> 
                        </Tab>
                        <Tab eventKey="Form2" title={titles[3].text} >
                            <Container fluid="md" className="bg-light shadow-sm p-3 mb-5 bg-white rounded">
                                <Formulario2/>
                            </Container> 
                        </Tab>
                        <Tab eventKey="Form3" title={titles[4].text} >
                            <Container fluid="md" className="bg-light shadow-sm p-3 mb-5 bg-white rounded">
                                <Formulario1/>
                            </Container> 
                        </Tab>
                    </Tabs>

                    {/* <Nav fill variant="tabs" defaultActiveKey="#one" fluid="ls" className="shadow-lg" >
                        <Nav.Item >
                            <Nav.Link href="#one"  onClick={() => this.ShowForm(0)} style={{color: '#000000'}}>{titles[0].text}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#two"  onClick={ () => this.ShowForm(1)} style={{color: '#000000'}} >{titles[1].text} / {titles[2].text}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#three" onClick={ () => this.ShowForm(2)} style={{color: '#000000'}}>{titles[2].text}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                <Container fluid="md" className="bg-light shadow-lg">
                    { show1 ? <Formulario0/> : null }
                    { show2 ? <Formulario1 /> : null }
                    { show3 ? <Formulario2 /> : null }
                </Container> */}
            </main>
        )
        
    }
}

export default FormularioC