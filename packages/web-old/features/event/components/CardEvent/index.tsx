// import style from './index.module.scss'
import dayjs from '@web/utils/dayjs'

import { Card, Group, Image, Text, Title } from '@mantine/core'

import type { ListEventDTO } from '../../types/DTO'

type Props = {
  className?: string
  event: ListEventDTO
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  className,
  event,
}) => (
  <Card
    className={`${className}`}
    shadow="sm"
    padding="xs"
    radius="sm"
    withBorder
    component="a"
    href={`/events/${event.ID}`}
  >
    <Card.Section mb="xs">
      <Image src={event.images[0]} alt={''} height={160} />
    </Card.Section>
    <Group position="left">
      <Text size="sm" color="gray">
        {dayjs.unix(event.startAt).format('YYYY/MM/DD（ddd）')}
      </Text>
      <Text size="sm" color="gray">
        {dayjs.unix(event.startAt).format('HH:mm')}
      </Text>
    </Group>
    <Title size="h4">{event.title}</Title>
  </Card>
)

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function CardEvent(props: Props) {
  return <Presenter {...Container(props)} />
}
