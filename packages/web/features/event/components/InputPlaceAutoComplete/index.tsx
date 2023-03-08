import { Loader } from '@googlemaps/js-api-loader'
import { TextInput } from '@mantine/core'
import { useEffect, useRef } from 'react'

import style from './index.module.scss'

type Props = {
  className?: string
}

const DEFAULT_CENTER = {
  lat: 35.66, // 緯度経度
  lng: 139.74,
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  mapRef,
  inputRef,
}) => (
  <div className={`${className}`}>
    <TextInput label="開催地" ref={inputRef} />

    {/* <InputPlaceMap className={style.mapContainer} /> */}
    <div className={style.mapContainer} ref={mapRef} />
  </div>
)

const Container = (props: Props) => {
  /** Logic here */

  const mapRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const setupMap = () => {
    if (!mapRef.current) return
    new window.google.maps.Map(mapRef.current, {
      center: DEFAULT_CENTER,
      zoom: 15,
    })
  }

  const setupAutocomplete = () => {
    console.log(window.google.maps.places)
    // if (!inputRef.current) return
    // const autocomplete = new window.google.maps.places.Autocomplete(
    //   inputRef.current,
    // )
    // autocomplete.addListener('place_changed', () => {
    //   const place = autocomplete.getPlace()
    //   console.log(place)
    // })
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    })

    console.log(loader)

    loader.load().then(() => {
      console.log('google map loaded')
      setupMap()
      setupAutocomplete()
    })
  }, [])

  const containerProps = {
    mapRef,
    inputRef,
  }
  return { ...props, ...containerProps }
}

export default function InputPlaceAutoComplete(props: Props) {
  return <Presenter {...Container(props)} />
}
