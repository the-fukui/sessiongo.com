import type { ListEventDTO } from '@web/features/event'
import { listEventsOfMonth } from '@web/features/event/server'

type Params = {
  year?: string
  month?: string
}

const handler = async (
  req: NextApiRequest<Params>,
  res: NextApiResponse<ListEventDTO[]>,
) => {
  if (req.method !== 'GET') return res.status(405).end()

  const { year, month } = req.query

  const events = await listEventsOfMonth({
    year: year && parseInt(year) > 0 ? parseInt(year) : undefined,
    month: month && parseInt(month) > 0 ? parseInt(month) : undefined,
  })

  res.status(200).json(events)
}

export default handler
