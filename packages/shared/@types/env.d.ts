declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
      NEXT_PUBLIC_SITE_URL: string;
    }
  }
}

export {}
