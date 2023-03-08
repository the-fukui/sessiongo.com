// import style from './index.module.scss'
import InputPlaceAutoComplete from '@web/features/event/components/InputPlaceAutoComplete'
import type { page } from '@web/pages/events/create'

const Presenter: React.FC<ReturnType<typeof Container>> = () => (
  <div>
    <InputPlaceAutoComplete />
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
