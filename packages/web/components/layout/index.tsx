// import style from './index.module.scss'
import { AppShell } from '@mantine/core'

type Props = {
  className?: string
  children: React.ReactNode
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  children,
}) => <AppShell className={className}>{children}</AppShell>

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function Layout(props: Props) {
  return <Presenter {...Container(props)} />
}
