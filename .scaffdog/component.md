---
name: '[@web] component'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter component name.'
  path:
    message: 'Please enter component path.'
    initial: '/'
---

# `packages/web/components{{ inputs.path }}{{ inputs.name }}/index.tsx`

```tsx
import React from 'react'

// import style from './index.module.scss'

type Props = {
  className?: string
}

const Presenter: React.FC<ReturnType<typeof Container>> = ({ className }) => (
  <div className={`${className}`}></div>
)

const Container = (props: Props) => {
  /** Logic here */

  const containerProps = {}
  return { ...props, ...containerProps }
}

export default function {{ inputs.name | pascal }}(props: Props) {
  return <Presenter {...Container(props)} />
}
```

# `packages/web/components{{ inputs.path }}{{ inputs.name }}/index.module.scss`

```scss

```
