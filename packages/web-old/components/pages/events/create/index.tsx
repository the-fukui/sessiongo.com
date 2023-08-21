// import style from './index.module.scss'
import { FormEvent } from '@web/features/event'
import type { page } from '@web/pages/events/create'

const Presenter: React.FC<ReturnType<typeof Container>> = () => (
  <div>
    <FormEvent />
  </div>
)

const Container = (pageProps: ReturnType<typeof page>) => {
  /** Logic here */

  const containerProps = {}
  return { ...pageProps, ...containerProps }
}

export default function Create(pageProps: ReturnType<typeof page>) {
  return <Presenter {...Container(pageProps)} />
}
