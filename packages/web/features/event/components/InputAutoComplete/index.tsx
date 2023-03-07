import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

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
  isLoaded,
  onLoad,
}) => (
  <div className={`${className}`}>
    {isLoaded && (
      <GoogleMap
        mapContainerClassName={style.mapContainer}
        center={DEFAULT_CENTER}
        zoom={15}
        onLoad={onLoad}
      ></GoogleMap>
    )}
  </div>
)

const Container = (props: Props) => {
  /** Logic here */
  const { isLoaded } = useJsApiLoader({
    id: 'input-autocomplete',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    preventGoogleFontsLoading: true,
  })

  const onLoad = (map: google.maps.Map) => {}

  const containerProps = {
    isLoaded,
    onLoad,
  }
  return { ...props, ...containerProps }
}

export default function InputAutoComplete(props: Props) {
  return <Presenter {...Container(props)} />
}
