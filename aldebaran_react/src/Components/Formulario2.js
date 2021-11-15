import React from 'react'
import {Card ,Nav , Button} from 'react-bootstrap';
class Formulario2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg : "Primera aplicacion React",
        }   
    }
    render() {
        return (
            <h1>
                Formulario 2
            </h1>
        )
    }
}

export default Formulario2