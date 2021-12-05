const url = 'http://localhost:3000/'

export async function getInicio () {
    const response = await  fetch(url)
    const responseJson = await response.json()
    return responseJson
    
}
export function servicios() {
    fetch('http://localhost:5000/ServEducativo')
    .then((resp) => resp.json())
    .then(function(data) {
        var  array = []
        data["Servicios"].forEach( function(valor) {
            array.push(valor);
        });
        return array;
    })
    .catch(function(error) {
        console.log(error);
    });
}

export default servicios
