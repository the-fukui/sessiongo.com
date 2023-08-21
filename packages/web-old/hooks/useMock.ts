import { useEffect, useState } from 'react'

export const useMock = () => {
  const [isMockReady, setIsMockReady] = useState<boolean>(
    process.env.NODE_ENV === 'production',
  ) // productionでは最初からready

  useEffect(() => {
    import('@web/mock/index')
      .then(({ initMocks }) => {
        return initMocks()
      })
      .then(() => {
        setIsMockReady(true)
      })
  }, [])

  return { isMockReady }
}
