// import style from './index.module.scss'
import { useEventCalendar } from '@web/features/event'
import type { page } from '@web/pages/events/index'

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  Calendar,
  Grid,
}) => (
  <div>
    <Calendar />
    <Grid />
  </div>
)

const Container = (pageProps: ReturnType<typeof page>) => {
  /** Logic here */

  const { events } = pageProps
  const { Calendar, Grid } = useEventCalendar(events)

  const containerProps = {
    Calendar,
    Grid,
  }
  return { ...pageProps, ...containerProps }
}

export default function Index(pageProps: ReturnType<typeof page>) {
  return <Presenter {...Container(pageProps)} />
}
