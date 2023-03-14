import type { CreateEventDTO } from '@web/features/event/types/DTO'

import { useForm } from '@mantine/form'
import { useRef } from 'react'

// 日時を日付と時刻に分けて入力するため、フォーム用に型を変える
interface CreateEventFormInputs extends Omit<CreateEventDTO, 'startAt'> {
  startDate: Date
  startTime: string
  endTime: string
}

export const useEventForm = () => {
  const { getInputProps, onSubmit: _onSubmit } = useForm<CreateEventFormInputs>(
    {},
  )

  const startDateRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<HTMLInputElement>(null)
  const endTimeRef = useRef<HTMLInputElement>(null)

  const onSubmit = _onSubmit(console.log)

  return {
    getInputProps,
    onSubmit,
    startDateRef,
    startTimeRef,
    endTimeRef,
  }
}
