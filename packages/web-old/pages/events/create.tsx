import Component from '@web/components/pages/events/create'

import type { GetStaticPropsContext } from 'next'

export const page = (serverProps: InferSSRProps<typeof getStaticProps>) => {
  /** Next.js依存層 */

  const pageProps = {}
  return { ...serverProps, ...pageProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  }

  // return {
  //   notFound:true
  // } as const
}

export default function Create(
  serverProps: InferSSRProps<typeof getStaticProps>,
) {
  return <Component {...page(serverProps)} />
}
