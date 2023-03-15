// import style from './index.module.scss'
import { Anchor, Stack, Text } from '@mantine/core'
import type { IconType } from 'react-icons'

type Props = {
  className?: string
  href: string
  Icon: IconType
  children: string
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  href,
  Icon,
  children,
}) => (
  <Anchor className={`${className}`} href={href} unstyled>
    <Stack align="center" spacing={0}>
      <Icon size={20} />
      <Text>{children}</Text>
    </Stack>
  </Anchor>
)

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function NavigationBottomItem(props: Props) {
  return <Presenter {...Container(props)} />
}
