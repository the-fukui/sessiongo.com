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

  // 都道府県名を取得
  const adminiStrativeArea = place.address_components.find(
    (component) =>
      component.types.includes('administrative_area_level_1') ||
      component.types.includes('administrative_area_level_2') ||
      component.types.includes('administrative_area_level_3') ||
      component.types.includes('administrative_area_level_4') ||
      component.types.includes('administrative_area_level_5') ||
      component.types.includes('administrative_area_level_6') ||
      component.types.includes('administrative_area_level_7'),
  )

  if (!adminiStrativeArea) return ''

  // 都道府県名以降を取得
  const address =
    adminiStrativeArea.long_name +
      place.formatted_address.split(adminiStrativeArea.long_name)[1] || ''

  return address
}
