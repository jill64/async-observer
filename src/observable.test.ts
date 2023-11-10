import { expect, test } from 'vitest'
import { observable } from './index.js'

test('toResolve', async () => {
  const { status, observed } = observable({
    rejectToIdle: 100,
    resolveToIdle: 100
  })

  const run = observed(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
  )

  let str = ''

  status.subscribe((status) => {
    str = status
  })

  expect(str).toBe('IDLE')

  run()

  expect(str).toBe('PENDING')

  await new Promise<void>((resolve) => {
    status.subscribe((status) => {
      if (status === 'FULFILLED') {
        resolve()
      }
    })
  })

  await new Promise<void>((resolve) => {
    status.subscribe((status) => {
      if (status === 'IDLE') {
        resolve()
      }
    })
  })
})

test('toThrow', async () => {
  const { status, observed } = observable({
    rejectToIdle: 100,
    resolveToIdle: 100
  })

  const run = observed(
    () =>
      new Promise((_, reject) => {
        setTimeout(reject, 1000)
      })
  )

  let str = ''

  status.subscribe((status) => {
    str = status
  })

  expect(str).toBe('IDLE')

  run().catch(() => {})

  expect(str).toBe('PENDING')

  await new Promise<void>((resolve) => {
    status.subscribe((status) => {
      if (status === 'REJECTED') {
        resolve()
      }
    })
  })

  await new Promise<void>((resolve) => {
    status.subscribe((status) => {
      if (status === 'IDLE') {
        resolve()
      }
    })
  })
})
