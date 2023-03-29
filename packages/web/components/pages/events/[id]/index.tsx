// import style from './index.module.scss'
import type { page } from '@web/pages/events/[id]'

const Presenter: React.FC<ReturnType<typeof Container>> = ({ event }) => (
  <div>
    <h1>{event.title}</h1>
    <p>{event.description}</p>
    <p>{event.placeName}</p>
    <p>{event.placeAddress}</p>
    <a href={event.placeMapURL}>{event.placeMapURL}</a>
  </div>
)

const Container = (pageProps: ReturnType<typeof page>) => {
  /** Logic here */

  const containerProps = {}
  return { ...pageProps, ...containerProps }
}

export default function Id(pageProps: ReturnType<typeof page>) {
  return <Presenter {...Container(pageProps)} />
}
