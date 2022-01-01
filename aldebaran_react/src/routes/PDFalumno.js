import React from 'react';
import { Page, Text, View, Document, StyleSheet , PDFViewer } from '@react-pdf/renderer';
import {useParams} from 'react-router-dom'
class PDFAlumno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Primera aplicacion React",
        }
    }
    componentDidMount() {
        const id  = this.props.params;
        console.log(id.value);
    }
    render() {
        const styles = StyleSheet.create({
            page: {
              flexDirection: 'row',
              backgroundColor: '#E4E4E4'
            },
            section: {
              margin: 10,
              padding: 10,
              flexGrow: 1
            },
            body :{
                height:"100%",
                margin:0,
            }
        });
        return (
            <div>
                  <PDFViewer style={styles.body}>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <Text>Section #1</Text>
                            </View>
                            <View style={styles.section}>
                                <Text>Section #2</Text>
                            </View>
                        </Page>
                    </Document>
                  </PDFViewer>
           </div>

        )
    }
}

export default (props) => (
    <PDFAlumno
        {...props}
        params={useParams()}
    />
);

// export default PDFAlumno