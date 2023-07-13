import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		include: ['src/tests/**/*.{spec,test}.{js,ts}'],
		environment: 'miniflare',
		environmentOptions: {
			kvNamespaces: ['FIREBASE_JWK_CACHE_KV'],
		},
	},
	resolve: {
		alias: {
			'@api': './',
		},
	},
})
