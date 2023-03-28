import Component from '@web/components/pages/events/[id]'
import { serverGetEvent } from '@web/features/event'

import type { GetStaticPropsContext } from 'next'

export const page = (serverProps: InferSSRProps<typeof getStaticProps>) => {
  /** Next.js依存層 */

  const pageProps = {}
  return { ...serverProps, ...pageProps }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { id } = params as { id: string }

  const event = await serverGetEvent(id)

  if (!event)
    return {
      notFound: true,
    } as const

  return {
    props: {
      event,
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default function Id(serverProps: InferSSRProps<typeof getStaticProps>) {
  return <Component {...page(serverProps)} />
}
