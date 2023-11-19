import type {
  Invalidator,
  StartStopNotifier,
  Subscriber,
  Unsubscriber,
  Updater
} from 'svelte/store'

type SubscribeInvalidateTuple<T> = [Subscriber<T>, Invalidator<T>]

function noop() {}

function safe_not_equal(a: unknown, b: unknown) {
  return a != a
    ? b == b
    : a !== b || (a && typeof a === 'object') || typeof a === 'function'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subscriber_queue: any[] = []

export function writable<T>(value: T, start: StartStopNotifier<T> = noop) {
  let stop: Unsubscriber | null

  const subscribers = new Set<SubscribeInvalidateTuple<T>>()

  function set(new_value: T) {
    if (safe_not_equal(value, new_value)) {
      value = new_value
      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length
        for (const subscriber of subscribers) {
          subscriber[1]()
          subscriber_queue.push(subscriber, value)
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1])
          }
          subscriber_queue.length = 0
        }
      }
    }
  }

  function update(fn: Updater<T>) {
    set(fn(value))
  }

  function subscribe(
    run: Subscriber<T>,
    invalidate: Invalidator<T> = noop
  ): Unsubscriber {
    const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate]
    subscribers.add(subscriber)
    if (subscribers.size === 1) {
      stop = start(set, update) || noop
    }
    run(value)
    return () => {
      subscribers.delete(subscriber)
      if (subscribers.size === 0 && stop) {
        stop()
        stop = null
      }
    }
  }

  return { set, subscribe }
}
