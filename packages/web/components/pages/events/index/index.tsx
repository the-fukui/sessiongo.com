// import style from './index.module.scss'
import { GridEvent } from '@web/features/event'
import type { page } from '@web/pages/events/index'

const Presenter: React.FC<ReturnType<typeof Container>> = ({ events }) => (
  <div>
    <GridEvent events={events} />
  </div>
)

const Container = (pageProps: ReturnType<typeof page>) => {
  /** Logic here */

  const containerProps = {}
  return { ...pageProps, ...containerProps }
}

export default function Index(pageProps: ReturnType<typeof page>) {
  return <Presenter {...Container(pageProps)} />
}
