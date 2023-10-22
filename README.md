<!----- BEGIN GHOST DOCS HEADER ----->
<!----- END GHOST DOCS HEADER ----->

## Installation

```sh
npm i @jill64/async-observer
```

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
