import { hooks } from '@jill64/npm-demo-layout'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'

const { onHandle, onError } = init(
  'https://96e02b6ae403a69fc7765cc87aa3fa34@o4505814639312896.ingest.us.sentry.io/4507659542921216'
)

export const handle = onHandle(hooks)
export const handleError = onError()
