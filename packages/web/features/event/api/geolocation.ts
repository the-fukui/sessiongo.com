// ip-apiから座標を取得する
// http://ip-api.com/json/

interface Response {
  lat: number
  lon: number
}

export const getGeolocation = async () => {
  const url = new URL('http://ip-api.com/json/')
  url.searchParams.append('fields', 'lat,lon')

  const response = await fetch(url.toString(), { cache: 'no-cache' })
  const data = (await response.json()) as Response
  return data
}
