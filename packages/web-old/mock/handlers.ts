import { mockEvents, mockGeolocation } from '@web/features/event'

import { rest } from 'msw'

export const handlers = [
  rest.get('http://ip-api.com/json/', mockGeolocation),
  // rest.get('/api/events', mockEvents),
]
