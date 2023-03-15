import { useMap } from '@web/features/event/hooks/useMap'

import { Box, Group, TextInput } from '@mantine/core'

// import style from './index.module.scss'

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
  setFieldValue: (value: any) => void
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  mapRef,
  inputRef,
  inputProps,
}) => (
  <Group className={`${className}`}>
    <TextInput
      w={'100%'}
      withAsterisk
      label="開催地"
      ref={inputRef}
      {...inputProps}
    />
    <Box w={'100%'} h={300} pos={'relative'}>
      <Box ref={mapRef} w={'100%'} h={'100%'} />
    </Box>
  </Group>
)

const Container = (props: Props) => {
  /** Logic here */
  const onPlaceID = props.setFieldValue

  const { mapRef, inputRef } = useMap({ onPlaceID })

  // Google Map SDKと競合するので、inputPropsからvalueを除外し、setFieldValueで値を更新する
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, ...inputProps } = props.getInputProps()

  const containerProps = {
    mapRef,
    inputRef,
    inputProps,
  }
  return { ...props, ...containerProps }
}

export default function InputPlaceAutoComplete(props: Props) {
  return <Presenter {...Container(props)} />
}
