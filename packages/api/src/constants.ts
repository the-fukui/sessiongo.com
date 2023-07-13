/**
 * .env.varsだとコンテキストからしか取得できず、取り回しが悪いのでシークレット以外はここに記載する
 */
export const R2_PUBLIC_BUCKET_URL = 'https://example.com'
export const FIREBASE_PROJECT_ID = 'default'
export const FIREBASE_PUBLIC_JWK_CACHE_KEY = 'public-jwk-cache-key'
export const FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099'
