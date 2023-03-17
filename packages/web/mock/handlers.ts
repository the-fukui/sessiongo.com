import { mockEvents } from '@web/features/event'

import { rest } from 'msw'

export const handlers = [rest.get('/api/events', mockEvents)]
