// import style from './index.module.scss'
import { MultiSelect } from '@mantine/core'
import type { Entries } from 'type-fest'

import { EVENT_FEATURE } from '../../constants'

type Props = {
  className?: string
  onSelect: (value: (keyof typeof EVENT_FEATURE)[]) => void
  selected?: (keyof typeof EVENT_FEATURE)[]
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({
  options,
  onSelect,
  selected,
}) => (
  <MultiSelect
    data={options}
    onChange={onSelect}
    value={selected}
    searchable
    clearable
  />
)

const Container = (props: Props) => {
  /** Logic here */

  const options = (
    Object.entries(EVENT_FEATURE) as Entries<typeof EVENT_FEATURE>
  ).map(([value, label]) => ({
    value,
    label,
  }))

  const containerProps = {
    options,
  }
  return { ...props, ...containerProps }
}

export default function SelectEventFeature(props: Props) {
  return <Presenter {...Container(props)} />
}
