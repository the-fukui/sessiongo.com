// ip-apiから座標を取得する
// http://ip-api.com/json/

interface Response {
  lat: number
  lon: number
}
interface Coordinates {
  lat: number
  lng: number
}

export const getGeolocation = async (): Promise<Coordinates> => {
  const url = new URL('http://ip-api.com/json/')
  url.searchParams.append('fields', 'lat,lon')

  const response = await fetch(url.toString(), { cache: 'no-cache' })
  const coordinates = await response.json().then((json: Response) => ({
    lat: json.lat,
    lng: json.lon,
  }))
  return coordinates
}
