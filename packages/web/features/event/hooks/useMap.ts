import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef } from 'react'

const DEFAULT_CENTER = {
  lat: 35.66, // 緯度経度
  lng: 139.74,
}

export const useMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mapInstanceRef = useRef<google.maps.Map>()
  const autocompleteInstanceRef = useRef<google.maps.places.Autocomplete>()

  const setupMap = () => {
    if (!mapRef.current) return
    const map = new window.google.maps.Map(mapRef.current, {
      center: DEFAULT_CENTER,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
    })
    mapInstanceRef.current = map
  }

  const setupAutocomplete = () => {
    if (!inputRef.current) return
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: 'jp' },
        // fields: ['name', 'geometry', 'formatted_address'],
      },
    )

    autocompleteInstanceRef.current = autocomplete

    autocomplete.addListener('place_changed', onPlaceChanged)
  }

  const onPlaceChanged = () => {
    if (!mapInstanceRef.current || !autocompleteInstanceRef.current) return

    // Autocompleteした場所にマップを移動
    const place = autocompleteInstanceRef.current.getPlace()
    console.log({ place })
    const latLng = place.geometry?.location
    if (latLng) mapInstanceRef.current.panTo(latLng)
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })

    loader.load().then(() => {
      console.log('google map loaded')
      setupMap()
      setupAutocomplete()
    })
  }, [])

  return { mapRef, inputRef }
}
