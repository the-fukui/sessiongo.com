import { useMap } from '@web/features/event/hooks/useMap'

import { TextInput } from '@mantine/core'

import style from './index.module.scss'

type Props = {
  className?: string
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

  const { mapRef, inputRef } = useMap()

  const containerProps = {
    mapRef,
    inputRef,
  }
  return { ...props, ...containerProps }
}

export default function InputPlaceAutoComplete(props: Props) {
  return <Presenter {...Container(props)} />
}
