/**
 * Place結果から場所名を取得する
 */
export const getPlaceName = (place: google.maps.places.PlaceResult) => {
  if (place.name) return place.name
  if (place.formatted_address) return place.formatted_address
  return ''
}

/**
 * Place結果から住所（国名、郵便番号を除く）を取得する
 */
export const getPlaceAddress = (place: google.maps.places.PlaceResult) => {
  if (!place.formatted_address || !place.address_components) return ''

  // 国名コンポーネントを取得
  const country = place.address_components.findLast((component) =>
    component.types.includes('country'),
  )

  // 郵便番号コンポーネントを取得
  const postalCode = place.address_components.findLast((component) =>
    component.types.includes('postal_code'),
  )

  if (!country || !postalCode) return place.formatted_address

  // 国名と郵便番号を除いた住所を取得
  const address = place.formatted_address
    .replace(country.long_name, '')
    .replace(postalCode.long_name, '')
    .replace(/〒/g, '') // 郵便番号記号を除去
    .trim()
    .replace(/^[,、。.]/, '') // 最初のカンマ、句点を除去
    .replace(/[,、。.]$/, '') // 最後のカンマ、句点を除去
    .trim()

  return address
}

/**
 * PlaceIDからPlace情報を取得する
 */
export const getPlace = async (
  placeID: string,
): Promise<
  Pick<google.maps.places.PlaceResult, 'formatted_address' | 'name' | 'url'>
> => {
  const placeDetailsAPI = new URL(
    'https://maps.googleapis.com/maps/api/place/details/json',
  )

  placeDetailsAPI.searchParams.append('place_id', placeID)
  placeDetailsAPI.searchParams.append('fields', 'name,formatted_address,url')
  placeDetailsAPI.searchParams.append('key', process.env.GOOGLE_MAPS_API_KEY)

  const response = await fetch(placeDetailsAPI.toString())

  if (!response.ok) {
    throw new Error('Failed to fetch place details')
  }

  const json = await response.json()

  if (json.status !== 'OK') {
    throw new Error('Failed to fetch place details')
  }

  return json.result
}
