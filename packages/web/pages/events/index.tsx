import Component from '@web/components/pages/events/index'
import type { ListEventDTO } from '@web/features/event'

import type { GetStaticPropsContext } from 'next'

export const page = (serverProps: InferSSRProps<typeof getStaticProps>) => {
  /** Next.js依存層 */

  const pageProps = {}
  return { ...serverProps, ...pageProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  const events = (await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/events`,
  ).then((res) => res.json())) as ListEventDTO[]

  return {
    props: {
      events,
    },
    revalidate: 60,
  }

  // return {
  //   notFound:true
  // } as const
}

export default function Index(
  serverProps: InferSSRProps<typeof getStaticProps>,
) {
  return <Component {...page(serverProps)} />
}
