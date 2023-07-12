import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		include: ['src/tests/**/*.{spec,test}.{js,ts}'],
		environment: 'miniflare',
	},
	resolve: {
		alias: {
			'@api': './',
		},
	},
})