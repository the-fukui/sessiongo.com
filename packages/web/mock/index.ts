export const initMocks = async () => {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    return server.listen({
      onUnhandledRequest: 'bypass',
    })
  } else {
    const { worker } = await import('./browser')
    return worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
