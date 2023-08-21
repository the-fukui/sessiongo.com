import type { GetEventDTO } from '@web/features/event'
import { getEvent } from '@web/features/event/server'

type Params = {
  id: string
}

const handler = async (
  req: NextApiRequest<Params>,
  res: NextApiResponse<GetEventDTO>,
) => {
  if (req.method !== 'GET') return res.status(405).end()

  const { id } = req.query

  const event = await getEvent(id)

  if (!event) return res.status(404).end()

  res.status(200).json(event)
}

export default handler
