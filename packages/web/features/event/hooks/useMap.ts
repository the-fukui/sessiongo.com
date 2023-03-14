import { useGeolocation } from '@web/features/event/hooks/useGeolocation'
import { getPlaceAddress } from '@web/features/event/utils/googleMap'

import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_ZOOM = 11

export const useMap = () => {
  const geolocation = useGeolocation()
  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mapInstanceRef = useRef<google.maps.Map>()
  const autocompleteInstanceRef = useRef<google.maps.places.Autocomplete>()

  const [address, setAddress] = useState<string>('')

  const setupMap = () => {
    if (!mapRef.current) return
    const map = new window.google.maps.Map(mapRef.current, {
      center: geolocation,
      zoom: DEFAULT_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      scrollwheel: false,
      clickableIcons: false,
      draggable: false,
    })

    mapInstanceRef.current = map
  }

  const setupAutocomplete = () => {
    if (!inputRef.current) return
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: [
          'name',
          'geometry',
          'formatted_address',
          'address_components',
          'place_id',
        ],
      },
    )

    autocompleteInstanceRef.current = autocomplete

    autocomplete.addListener('place_changed', onPlaceChanged)
  }

  const addMarker = (latLng: google.maps.LatLngLiteral) => {
    if (!mapInstanceRef.current) return

    new window.google.maps.Marker({
      position: latLng,
      map: mapInstanceRef.current,
    })
  }

  const onPlaceChanged = () => {
    if (!mapInstanceRef.current || !autocompleteInstanceRef.current) return

    const place = autocompleteInstanceRef.current.getPlace()

    if (!place) return

    // 場所名のみをテキストボックスに表示
    if (inputRef.current) inputRef.current.value = place.name || ''

    // Autocompleteした場所にマップを移動
    const latLng = place.geometry?.location
    if (latLng) {
      mapInstanceRef.current.panTo(latLng)
      mapInstanceRef.current.setZoom(15)
    }

    // マーカーを追加
    if (latLng) addMarker(latLng.toJSON())

    // 住所を取得
    const address = getPlaceAddress(place)
    setAddress(address)
  }

  useEffect(() => {
    if (!geolocation) return

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })

    // Google Maps APIを読み込み
    loader.load().then(() => {
      console.log('google map loaded')
      setupMap()
      setupAutocomplete()
    })
  }, [geolocation])

  return { mapRef, inputRef, address }
}
