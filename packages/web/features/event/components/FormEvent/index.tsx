// import style from './index.module.scss'
import InputPlaceAutoComplete from '@web/features/event/components/InputPlaceAutoComplete'
import { EVENT_FEATURE, EVENT_TYPE } from '@web/features/event/constants'
import { useEventForm } from '@web/features/event/hooks/useEventForm'

import {
  Button,
  FileInput,
  Group,
  Image,
  MultiSelect,
  SegmentedControl,
  TextInput,
  Textarea,
} from '@mantine/core'
import { DatePickerInput, DatesProvider, TimeInput } from '@mantine/dates'
import 'dayjs/locale/ja'

type Props = {
  className?: string
}

// イベントタイプ選択用のセグメントコントロールのオプション
const eventTypeOptions = Object.entries(EVENT_TYPE).map(([key, value]) => ({
  label: value,
  value: key,
}))

// イベント特徴選択用のマルチセレクトのオプション
const eventFeatureOptions = Object.entries(EVENT_FEATURE).map(
  ([key, value]) => ({
    label: value,
    value: key,
  }),
)

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  getInputProps,
  onSubmit,
  setFieldValue,
  startTimeRef,
  endTimeRef,
  onImageChange,
  imagePreview,
}) => (
  <form className={`${className}`} onSubmit={onSubmit}>
    <SegmentedControl
      mb={'lg'}
      data={eventTypeOptions}
      {...getInputProps('type')}
    />
    <TextInput
      mb={'lg'}
      withAsterisk
      label={'タイトル'}
      {...getInputProps('title')}
    />
    <TextInput mb={'lg'} label={'主催者・ホスト'} {...getInputProps('host')} />

    <DatesProvider settings={{ locale: 'ja', firstDayOfWeek: 0 }}>
      <Group align="end" mb={'lg'}>
        <DatePickerInput
          withAsterisk
          label={'開催日'}
          placeholder={'日時を選択'}
          valueFormat="YYYY年M月D日"
          {...getInputProps('startDate')}
        />
        <TimeInput
          label={'開始時刻'}
          withAsterisk
          ref={startTimeRef}
          onClick={() => startTimeRef.current?.showPicker()}
          {...getInputProps('startTime')}
        />
        <TimeInput
          label={'終了時刻'}
          ref={endTimeRef}
          onClick={() => endTimeRef.current?.showPicker()}
          {...getInputProps('endTime')}
        />
      </Group>
    </DatesProvider>
    <InputPlaceAutoComplete
      mb={'lg'}
      getInputProps={() => getInputProps('placeID')}
      setFieldValue={(placeID: string) => setFieldValue('placeID', placeID)}
    />
    <MultiSelect
      mb={'lg'}
      label={'イベントの特徴'}
      searchable
      limit={20}
      data={eventFeatureOptions}
      {...getInputProps('feature')}
    />
    <Textarea
      mb={'lg'}
      withAsterisk
      label={'説明文'}
      autosize
      minRows={3}
      {...getInputProps('description')}
    />
    <Group mb={'lg'}>
      <FileInput
        label={'画像'}
        placeholder={'画像を選択'}
        accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
        {...getInputProps('images')}
        onChange={(file) => {
          onImageChange(file)
          getInputProps('images').onChange(file)
        }}
      />
      {imagePreview && (
        <Image
          src={imagePreview}
          alt={'アップロード画像のプレビュー'}
          height={500}
          fit="contain"
        />
      )}
    </Group>
    <br />
    <br />

    <Button type="submit">作成</Button>
  </form>
)

const Container = (props: Props) => {
  /** Logic here */

  const {
    getInputProps,
    onSubmit,
    startTimeRef,
    endTimeRef,
    setFieldValue,
    onImageChange,
    imagePreview,
  } = useEventForm()

  const containerProps = {
    getInputProps,
    onSubmit,
    setFieldValue,
    startTimeRef,
    endTimeRef,
    onImageChange,
    imagePreview,
  }
  return { ...props, ...containerProps }
}

export default function FormEvent(props: Props) {
  return <Presenter {...Container(props)} />
}
