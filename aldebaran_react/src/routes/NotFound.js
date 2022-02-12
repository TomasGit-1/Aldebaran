import React from 'react';
import { Image} from 'react-bootstrap';
import { StyleSheet } from '@react-pdf/renderer';
import imgNotFound from "../static/404-error.jpg";

class NotFound extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: "Primera aplicacion React",
            url: "",

        }

    }

    render() {
        const styles = StyleSheet.create({
            container: {
                alignself:'center'                

                
            },
            logo: {
              width: 300,
              height: 400,
            },
          });
          
        return (
            <div style={styles.container}>
                <Image
                    width="400" className="rounded mx-auto d-block"
                    src={imgNotFound}
                />

            </div>
        )
    }
}
export default NotFound;