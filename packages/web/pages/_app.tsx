import Layout from '@web/components/Layout'
import { useMock } from '@web/hooks/useMock'

import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { isMockReady } = useMock()
  console.log({ isMockReady })

  if (!isMockReady) {
    return <div>Loading mock...</div>
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  )
}

export default MyApp
