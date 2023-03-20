// import style from './index.module.scss'
import type { page } from '@web/pages/events/index'

const Presenter: React.FC<ReturnType<typeof Container>> = ({ events }) => (
  <div>
    <pre>{JSON.stringify(events, null, 2)}</pre>
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
