import Layout from '@web/components/Layout'
import { useMock } from '@web/hooks/useMock'

import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

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
        colors: {
          'shikkuri-white': [
            '#F4F5F7',
            '#D9DCE1',
            '#C1C5CD',
            '#ADB1B9',
            '#9B9FA7',
            '#8B8F97',
            '#7D8188',
          ],
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  )
}

export default MyApp
