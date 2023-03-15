import { useMap } from '@web/features/event/hooks/useMap'

import { TextInput } from '@mantine/core'

import style from './index.module.scss'

type InputAttributes = {
  value: any
  onChange: any
  checked?: any
  error?: any
  onFocus?: any
  onBlur?: any
}

type Props = {
  className?: string
  getInputProps: () => InputAttributes
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  mapRef,
  inputRef,
  address,
  getInputProps,
}) => (
  <div className={`${className}`}>
    <TextInput
      withAsterisk
      label="開催地"
      ref={inputRef}
      {...getInputProps()}
      // @TODO google mapと競合している
    />
    <div className={style.mapContainer}>
      <div ref={mapRef} className={style.map} />
      <div className={style.mapAddress}>{address}</div>
    </div>
  </div>
)

const Container = (props: Props) => {
  /** Logic here */
  const { mapRef, inputRef, address } = useMap()

  const containerProps = {
    mapRef,
    inputRef,
    address,
  }
  return { ...props, ...containerProps }
}

export default function InputPlaceAutoComplete(props: Props) {
  return <Presenter {...Container(props)} />
}
