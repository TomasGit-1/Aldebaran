const url = 'http://localhost:3000/'

export async function getInicio () {
    const response = await  fetch(url)
    const responseJson = await response.json()
    return responseJson
    
}
export default getInicio
