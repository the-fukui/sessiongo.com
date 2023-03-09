import { getGeolocation } from '@web/features/event/api/geolocation'
import { getPlaceAddress } from '@web/features/event/utils/googleMap'

import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_CENTER = {
  lat: 35.66, // 緯度経度
  lng: 139.74,
}
const DEFAULT_ZOOM = 11

export const useMap = () => {
  const geolocationRef = useRef<google.maps.LatLngLiteral>(DEFAULT_CENTER)
  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mapInstanceRef = useRef<google.maps.Map>()
  const autocompleteInstanceRef = useRef<google.maps.places.Autocomplete>()

  const [address, setAddress] = useState<string>('')

  const setupMap = () => {
    if (!mapRef.current) return
    const map = new window.google.maps.Map(mapRef.current, {
      center: geolocationRef.current,
      zoom: DEFAULT_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      scrollwheel: false,
    })
    mapInstanceRef.current = map
  }

  const setupAutocomplete = () => {
    if (!inputRef.current) return
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: 'jp' },
        fields: ['name', 'geometry', 'formatted_address', 'address_components'],
      },
    )

    autocompleteInstanceRef.current = autocomplete

    autocomplete.addListener('place_changed', onPlaceChanged)
  }

  const onPlaceChanged = () => {
    if (!mapInstanceRef.current || !autocompleteInstanceRef.current) return

    const place = autocompleteInstanceRef.current.getPlace()

    // 場所名のみをテキストボックスに表示
    if (inputRef.current) inputRef.current.value = place.name || ''

    // Autocompleteした場所にマップを移動
    const latLng = place.geometry?.location
    if (latLng) mapInstanceRef.current.panTo(latLng)

    // 住所を取得
    const address = getPlaceAddress(place)
    setAddress(address)
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })

    Promise.all([
      getGeolocation(), // IPから座標を取得
      loader.load(), // Google Maps APIを読み込み
    ]).then(([geolocation]) => {
      // IPから取得した座標を設定
      geolocationRef.current = {
        lat: geolocation.lat,
        lng: geolocation.lon,
      }

      console.log('google map loaded')
      setupMap()
      setupAutocomplete()
    })
  }, [])

  return { mapRef, inputRef, address }
}
