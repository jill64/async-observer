<!----- BEGIN GHOST DOCS HEADER ----->

# async-observer

[![npm-version](https://img.shields.io/npm/v/@jill64/async-observer)](https://npmjs.com/package/@jill64/async-observer) [![npm-license](https://img.shields.io/npm/l/@jill64/async-observer)](https://npmjs.com/package/@jill64/async-observer) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/async-observer)](https://npmjs.com/package/@jill64/async-observer) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/async-observer)](https://npmjs.com/package/@jill64/async-observer) [![ci.yml](https://github.com/jill64/async-observer/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/async-observer/actions/workflows/ci.yml) [![codecov-coverage](https://codecov.io/gh/jill64/async-observer/graph/badge.svg)](https://codecov.io/gh/jill64/async-observer)

Make Promise state observable as a string

## Install

```sh
npm i @jill64/async-observer
```

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
