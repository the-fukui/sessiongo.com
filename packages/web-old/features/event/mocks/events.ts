import type { MockedRequest, ResponseResolver, restContext } from 'msw'

import events from './data/events'

export const mockEvents: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(events))
}
