import type { ListEventDTO } from './../types/DTO'

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
