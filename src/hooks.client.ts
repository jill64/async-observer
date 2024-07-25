import { init } from '@jill64/sentry-sveltekit-cloudflare/client'

const onError = init(
  'https://96e02b6ae403a69fc7765cc87aa3fa34@o4505814639312896.ingest.us.sentry.io/4507659542921216'
)

export const handleError = onError()
