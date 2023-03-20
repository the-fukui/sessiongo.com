// import style from './index.module.scss'
import { Grid } from '@mantine/core'

import type { ListEventDTO } from '../../types/DTO'
import CardEvent from '../CardEvent'

type Props = {
  className?: string
  events: ListEventDTO[]
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  events,
}) => (
  <Grid className={`${className}`}>
    {events.map((event) => (
      <Grid.Col span={4} key={event.ID + event.startAt}>
        <CardEvent event={event} />
      </Grid.Col>
    ))}
  </Grid>
)

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function GridEvent(props: Props) {
  return <Presenter {...Container(props)} />
}
