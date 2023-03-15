import { useGeolocation } from '@web/features/event/hooks/useGeolocation'
import { getPlaceAddress } from '@web/features/event/utils/googleMap'

import { Loader } from '@googlemaps/js-api-loader'
import { useEffect, useRef, useState } from 'react'

interface Props {
  onPlaceID?: (placeID: string) => void
}

const DEFAULT_ZOOM = 11

export const useMap = ({ onPlaceID }: Props = { onPlaceID: () => {} }) => {
  const geolocation = useGeolocation()
  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mapInstanceRef = useRef<google.maps.Map>()
  const markerRef = useRef<google.maps.Marker>()
  const infoWindowRef = useRef<google.maps.InfoWindow>()
  const autocompleteInstanceRef = useRef<google.maps.places.Autocomplete>()

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

  const showMarker = (latLng: google.maps.LatLngLiteral) => {
    if (!mapInstanceRef.current) return

    // 既存のマーカーがあれば削除
    if (markerRef.current) {
      markerRef.current.setMap(null)
      markerRef.current = undefined
    }

    const marker = new window.google.maps.Marker({
      position: latLng,
      map: mapInstanceRef.current,
    })
    markerRef.current = marker
  }

  const showInfoWindow = (
    latLng: google.maps.LatLngLiteral,
    content: string,
  ) => {
    if (!mapInstanceRef.current) return

    // 既存のウィンドウがあれば削除
    if (infoWindowRef.current) {
      infoWindowRef.current.close()
      infoWindowRef.current = undefined
    }

    const infoWindow = new window.google.maps.InfoWindow({
      content,
      position: latLng,
      pixelOffset: new window.google.maps.Size(0, -40),
    })

    infoWindow.open(mapInstanceRef.current)
    infoWindowRef.current = infoWindow
  }

  const onPlaceChanged = () => {
    if (!mapInstanceRef.current || !autocompleteInstanceRef.current) return

    const place = autocompleteInstanceRef.current.getPlace()

    if (!place) return

    // 場所名のみをテキストボックスに表示
    if (inputRef.current) inputRef.current.value = place.name || ''

    // 住所を取得
    const address = getPlaceAddress(place)

    // Autocompleteした場所にマップを移動
    const latLng = place.geometry?.location
    if (latLng) {
      mapInstanceRef.current.panTo(latLng)
      mapInstanceRef.current.setZoom(15)
    }

    // マーカーを追加
    if (latLng) showMarker(latLng.toJSON())
    // 住所表示ウィンドウを追加
    if (latLng && address) showInfoWindow(latLng.toJSON(), address)

    // placeIDを親コンポーネントに渡す
    if (place.place_id && onPlaceID) onPlaceID(place.place_id)
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

    return () => {
      console.log('unmount')
      // Google Maps APIをアンマウント時にアンロード
      loader.deleteScript()
    }
  }, [geolocation])

  return { mapRef, inputRef }
}
