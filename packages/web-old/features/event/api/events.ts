import type { GetEventDTO, ListEventDTO } from './../types/DTO'

type GetEventsParams = {
  year?: number
  month?: number
}

/**
 * イベント一覧を取得する
 */
export const getEvents = async ({ year, month }: GetEventsParams = {}): Promise<
  ListEventDTO[]
> => {
  const url = new URL('/api/events', process.env.NEXT_PUBLIC_SITE_URL)
  if (year) url.searchParams.append('year', year.toString())
  if (month) url.searchParams.append('month', month.toString())

  const res = await fetch(url.toString())

  if (!res.ok) throw new Error('イベント一覧の取得に失敗しました')

  return (await res.json()) as ListEventDTO[]
}

/**
 * イベントを取得する
 */
export const getEvent = async (id: string): Promise<GetEventDTO> => {
  const url = new URL(`/api/events/${id}`, process.env.NEXT_PUBLIC_SITE_URL)

  console.log(url.toString())
  const res = await fetch(url.toString())

  if (!res.ok) throw new Error('イベントの取得に失敗しました')

  return (await res.json()) as GetEventDTO
}
