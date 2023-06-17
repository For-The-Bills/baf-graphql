import fetch from 'node-fetch'

async function fetchGeocode(endpoint:string) {
    console.log(endpoint)
    return await fetch(`https://geocode.maps.co/${endpoint}`)
    .then(async response => {
        if (response.ok) {
            const parsed = await response.json()
            console.log(parsed)
            return parsed
          }else {
            throw new Error(`geocode invalid request ${response.status}`);
          }
    })
}

async function getCoordsByAddresss(address: string){
    const result = await fetchGeocode(`search?q=${address}`)

    if (result.length == 0) return {error: 'error'}
    const x = result[0].lat
    const y = result[0].lon
    return{x: x, y: y}
}

export {
    getCoordsByAddresss
}