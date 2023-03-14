import { getGeolocation } from '@web/features/event/api/geolocation'

import { useEffect, useState } from 'react'

interface Coordinates {
  lat: number
  lng: number
}

const DEFAULT_COORDINATES = {
  lat: 35.66, // 緯度経度
  lng: 139.74,
} as const satisfies Coordinates

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<Coordinates>()

  useEffect(() => {
    getGeolocation()
      .then((coordinates) => {
        setGeolocation(coordinates)
      })
      .catch(() => {
        setGeolocation(DEFAULT_COORDINATES)
      })
  }, [])

  return geolocation
}
