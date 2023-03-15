// import style from './index.module.scss'
import NavigationBottomItem from '@web/components/NavigationBottomItem'
import { NAVIGATION } from '@web/constants/navigation'

import { Footer, Group } from '@mantine/core'

type Props = {
  className?: string
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({ className }) => (
  <Footer height={50} className={`${className}`}>
    <Group grow>
      {NAVIGATION.map((item) => (
        <NavigationBottomItem key={item.path} href={item.path} Icon={item.icon}>
          {item.name}
        </NavigationBottomItem>
      ))}
    </Group>
  </Footer>
)

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function NavigationBottom(props: Props) {
  return <Presenter {...Container(props)} />
}
