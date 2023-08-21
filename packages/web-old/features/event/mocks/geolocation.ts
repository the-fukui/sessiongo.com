import type { MockedRequest, ResponseResolver, restContext } from 'msw'

import type { Response } from '../api/geolocation'

const geolocation: Response = {
  lat: 35.6837,
  lon: 139.6805,
}

export const mockGeolocation: ResponseResolver<
  MockedRequest,
  typeof restContext
> = async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(geolocation))
}
