import { useEffect } from 'react'

let initialized = false
export const useMock = () => {
  useEffect(() => {
    if (initialized) return
    initialized = true
    if (process.env.NODE_ENV === 'development') {
      console.log('initial mock')
      import('@web/mock/index').then(({ worker }) =>
        worker.start({
          onUnhandledRequest: 'bypass',
        }),
      )
    }
  }, [])
}
