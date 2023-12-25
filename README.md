<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/async-observer


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/npm/v/@jill64/async-observer" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/npm/l/@jill64/async-observer" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/npm/dm/@jill64/async-observer" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/bundlephobia/min/@jill64/async-observer" alt="npm-min-size" /></a> <a href="https://github.com/jill64/async-observer/actions/workflows/ci.yml"><img src="https://github.com/jill64/async-observer/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>
<!----- END GHOST DOCS BADGES ----->


🔭 Make Promise state observable as a string

<!----- END GHOST DOCS HEADER ----->

## Example

```js
import { observable } from '@jill64/async-observer'

const { status, observed } = observable({
  // FULFILLED => IDLE at 100ms
  resolveToIdle: 100,
  // REJECTED => IDLE at 500ms
  rejectToIdle: 500
})

const run = observed(async () => {
  // e.g. Duration as 1000ms
  await yourAsyncFunction()
})

let str = ''

status.subscribe((status) => {
  str = status
})

// str => IDLE

run()

// str => PENDING

// ↓ After the 1000ms

// str => FULFILLED

// ↓ After the 100ms

// str => IDLE
```

## Compatibility for svelte store

Since `status` is implemented according to svelte store, it can be used in svelte applications as follows

```svelte
<script>
  import { observable } from '@jill64/async-observer'

  const { status, observed } = observable()

  $: set = observed(async () => {
    await yourAsyncFunction()
  })
</script>

<button on:click={set}>Button</button>

<div>{$status}</div>
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

MIT

<!----- END GHOST DOCS FOOTER ----->
