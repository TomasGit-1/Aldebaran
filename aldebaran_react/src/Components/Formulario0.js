import React from 'react'
import {Card ,Nav , Button} from 'react-bootstrap';
class Formulario0 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg : "Primera aplicacion React",
        }   
    }
    render() {
        return (
            <h1>
                Formulario 0
            </h1>
        )
    }
}

export default Formulario0