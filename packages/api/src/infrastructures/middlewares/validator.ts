import { createEventDTOSchema } from '@api/src/appplication/dtos/createEventDto'
import { zValidator } from '@hono/zod-validator'
import type { MiddlewareHandler } from 'hono'
import { validator } from 'hono/validator'

type Env = {
	DB: D1Database
	STORAGE: R2Bucket
}
export const validateCreateEventBody = (): MiddlewareHandler<{
	Bindings: Env
}> => zValidator('json', createEventDTOSchema)

export const validateMonthAndYear = () =>
	validator('param', (value, c) => {
		// 年と月が存在するかどうか
		if (!value.year || !value.month)
			return c.text('year and month are required', 400)

		const year = Number(value.year)
		const month = Number(value.month)

		// 年が1000以上の整数かどうか
		if (year < 1000 || !Number.isInteger(year))
			return c.text('year must be an integer greater than 1000', 400)

		// 月が1~12の間かどうか
		if (month < 1 || month > 12)
			return c.text('month must be an integer between 1 and 12', 400)

		return { year: value.year, month: value.month }
	})
