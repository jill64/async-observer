# async-observer

[![npm](https://img.shields.io/npm/v/%40jill64%2Fasync-observer)](https://npmjs.com/package/@jill64/async-observer)
[![codecov](https://codecov.io/github/jill64/async-observer/graph/badge.svg?token=YKG2OJ1SXP)](https://codecov.io/github/jill64/async-observer)

Make Promise state observable as a string

## Install

```sh
npm i @jill64/async-observer
```

## Example

Svelte store compatible

```svelte
<script>
  import { observable } from '@jill64/async-observer'

  const { status, observed } = observable()
  // Optional
  // {
  //   resolveToIdle?: number, (auto idling time [ms])
  //   rejectToIdle?: number   (auto idling time [ms])
  // }

  $: set = observed(async () => {
    // ...
    // Any task
    // ...
  })
</script>

<!-- Promise Execute -->
<button on:click={set}>Button</button>

<!-- IDLE | PENDING | FULFILLED | REJECTED -->
<div>{$status}</div>
```
