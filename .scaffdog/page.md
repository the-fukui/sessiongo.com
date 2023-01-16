---
name: '[@web] page'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter pages name.'
  path:
    message: 'Please enter page path.'
    initial: '/'
---

# `packages/web/pages{{ inputs.path }}/{{ inputs.name }}.tsx`

```tsx
import Component from '@web/components/pages/{{ inputs.name }}'

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

export default function {{ inputs.name | pascal }}(
  serverProps: InferSSRProps<typeof getStaticProps>,
) {
  return <Component {...page(serverProps)} />
}
```

# `packages/web/components/pages{{ inputs.path }}{{ inputs.name }}/index.tsx`

```tsx
import { page } from '@web/pages{{ inputs.path }}{{ inputs.name }}'

import React from 'react'

// import style from './index.module.scss'

const Presenter: React.FC<ReturnType<typeof Container>> = () => <div></div>

const Container = (pageProps: ReturnType<typeof page>) => {
  /** Logic here */

  const containerProps = {}
  return { ...pageProps, ...containerProps }
}

export default function {{ inputs.name | pascal }}(pageProps: ReturnType<typeof page>) {
  return <Presenter {...Container(pageProps)} />
}
```

# `packages/web/components/pages{{ inputs.path }}{{ inputs.name }}/index.module.scss`

```scss

```
