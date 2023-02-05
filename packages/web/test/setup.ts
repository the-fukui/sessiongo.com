import { loadEnvConfig } from '@next/env'

const loadEnv = () => {
  loadEnvConfig(process.cwd())
}

export default loadEnv
