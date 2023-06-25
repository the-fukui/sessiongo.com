import { eventRRules, events } from '@api/src/schema'
import { relations } from 'drizzle-orm'

// export const eventRRuleRelations = relations(eventRRules, ({ one }) => ({
// 	event: one(events, {
// 		fields: [eventRRules.eventId],
// 		references: [events.id],
// 	}),
// }))

export const eventRelations = relations(events, ({ one }) => ({
	rrule: one(eventRRules, {
		fields: [events.id],
		references: [eventRRules.eventId],
	}),
}))
