// import style from './index.module.scss'
import NavigationBottom from '@web/components/NavigationBottom'

import { AppShell } from '@mantine/core'

type Props = {
  className?: string
  children: React.ReactNode
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  children,
}) => (
  <AppShell className={className} footer={<NavigationBottom />}>
    {children}
  </AppShell>
)

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function Layout(props: Props) {
  return <Presenter {...Container(props)} />
}
