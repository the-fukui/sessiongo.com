import { z } from 'zod'

// param(string)で受け取るので、numberに変換してからz.number()でバリデーションする
export const getMonthlyEventsSchema = z.object({
	year: z
		.string()
		.transform((v) => parseInt(v))
		.pipe(z.number().gte(1000).lte(9999)),
	month: z
		.string()
		.transform((v) => parseInt(v))
		.pipe(z.number().gte(1).lte(12)),
})
