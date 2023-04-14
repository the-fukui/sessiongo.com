// import style from './index.module.scss'
import type { ListEventDTO } from '@web/features/event'
import { getEvents, useEventCalendar } from '@web/features/event'
import type { page } from '@web/pages/events/index'
import dayjs from '@web/utils/dayjs'

import { useState } from 'react'

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  Calendar,
  Grid,
  SelectFeature,
}) => (
  <div>
    {Calendar}
    {SelectFeature}
    {Grid}
  </div>
)

const Container = (pageProps: ReturnType<typeof page>) => {
  /** Logic here */

  const [events, setEvents] = useState<ListEventDTO[]>(pageProps.events)

  // カレンダーの表示月がわかった際にAPIを叩く
  const onMonthChange = async (date: number) => {
    const year = dayjs.unix(date).get('year')
    const month = dayjs.unix(date).get('month') + 1
    console.log({ year, month })
    const events = await getEvents({ year, month })
    setEvents(events)
  }

  const { Calendar, Grid, SelectFeature } = useEventCalendar({
    events,
    onMonthChange,
  })

  const containerProps = {
    Calendar,
    Grid,
    SelectFeature,
  }
  return { ...pageProps, ...containerProps }
}

export default function Index(pageProps: ReturnType<typeof page>) {
  return <Presenter {...Container(pageProps)} />
}
