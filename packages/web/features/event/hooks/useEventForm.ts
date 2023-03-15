import type { CreateEventDTO } from '@web/features/event/types/DTO'

import { hasLength, isNotEmpty, useForm } from '@mantine/form'
import { useRef, useState } from 'react'

// 日時を日付と時刻に分けて入力するため、フォーム用に型を変える
interface CreateEventFormInputs
  extends Omit<CreateEventDTO, 'startAt' | 'duration'> {
  startDate: Date
  startTime: string
  endTime: string
}

export const useEventForm = () => {
  const {
    getInputProps,
    onSubmit: _onSubmit,
    setFieldValue,
  } = useForm<CreateEventFormInputs>({
    initialValues: {
      title: '',
      description: '',
      status: 'DRAFT',
      type: 'SESSION',
      rrule: null,
      startDate: new Date(),
      startTime: '',
      endTime: '',
      placeID: '',
      feature: [],
      images: [],
    },
    // validate: {
    //   title: hasLength({ min: 1 }, 'タイトルを入力してください'),
    //   description: hasLength({ min: 1 }, '説明文を入力してください'),
    //   type: isNotEmpty('タイプを選択してください'),
    //   startDate: (value) => {
    //     if (!(value instanceof Date)) return '日付を入力してください'
    //     if (value.getDate() < new Date().getDate())
    //       return '過去の日付は指定できません'
    //     return null
    //   },
    //   startTime: (value, values) => {
    //     try {
    //       // 正しい時刻形式 + 未来の時間かどうかのチェック
    //       const [hours, minutes] = value.split(':').map(Number)
    //       const date = new Date(values.startDate).setHours(
    //         hours as number,
    //         minutes as number,
    //       )
    //       if (date < new Date().getTime()) return '過去の時刻は指定できません'
    //       return null
    //     } catch (e) {
    //       return '時刻を入力してください'
    //     }
    //   },
    //   endTime: (value) => {
    //     try {
    //       // 正しい時刻形式かどうかのチェック
    //       const [hours, minutes] = value.split(':').map(Number)
    //       new Date().setHours(hours as number, minutes as number)
    //       return null
    //     } catch (e) {
    //       return '時刻を入力してください'
    //     }
    //   },
    //   placeID: isNotEmpty('場所を選択してください'),
    //   feature: (value) => {
    //     if (Array.isArray(value)) return null
    //   },
    //   images: (value) => {
    //     if (Array.isArray(value)) return null
    //   },
    // },
  })

  const startDateRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<HTMLInputElement>(null)
  const endTimeRef = useRef<HTMLInputElement>(null)

  const [imagePreview, setImagePreview] = useState<string>()

  const onImageChange = async (file: File | null) => {
    if (!file) return

    const { compressImage } = await import('../utils/imageCompression')
    const compressedFile = await compressImage(file)

    console.log(compressedFile)

    // tobase64
    const reader = new FileReader()
    reader.readAsDataURL(compressedFile)
    reader.onload = () => {
      setImagePreview(reader.result as string)
    }
  }

  const onSubmit = _onSubmit(console.log)

  return {
    getInputProps,
    onSubmit,
    setFieldValue,
    startDateRef,
    startTimeRef,
    endTimeRef,
    onImageChange,
    imagePreview,
  }
}
