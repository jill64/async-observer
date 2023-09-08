import { writable } from 'svelte/store'
import { PromiseStatus } from './PromiseStatus.js'

export const observable = (options?: {
  resolveToIdle?: number
  rejectToIdle?: number
}) => {
  const { resolveToIdle = 5000, rejectToIdle = 5000 } = options ?? {}

  const { subscribe, set } = writable<PromiseStatus>('IDLE')

  const status = { subscribe }

  let id = 0

  const observed = <
    T,
    Fn extends (...args: (string & number & object)[]) => Promise<T>
  >(
    fn: Fn
  ) =>
    (async (...arg) => {
      id += 1

      const localId = id

      const setStatus = (status: PromiseStatus) => {
        if (localId === id) {
          set(status)
        }
      }

      set('PENDING')

      try {
        const res = await fn(...arg)

        setStatus('FULFILLED')
        setTimeout(() => setStatus('IDLE'), resolveToIdle)

        return res
      } catch (e) {
        setStatus('REJECTED')
        setTimeout(() => setStatus('IDLE'), rejectToIdle)

        throw e
      }
    }) as Fn

  return {
    status,
    observed
  }
}
