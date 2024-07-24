<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/async-observer

<!----- BEGIN GHOST DOCS BADGES ----->

<a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/npm/v/@jill64/async-observer" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/npm/l/@jill64/async-observer" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/npm/dm/@jill64/async-observer" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/async-observer"><img src="https://img.shields.io/bundlephobia/min/@jill64/async-observer" alt="npm-min-size" /></a> <a href="https://github.com/jill64/async-observer/actions/workflows/ci.yml"><img src="https://github.com/jill64/async-observer/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>

<!----- END GHOST DOCS BADGES ----->

🔭 Make Promise state observable as a string

<!----- END GHOST DOCS HEADER ----->

## Example

```svelte
<script>
  import { observable } from '@jill64/async-observer'

  let { status, observed } = observable()

  let set = observed(async () => {
    await yourAsyncFunction()
  })
</script>

<button onclick={set}>Button</button>

<div>{status}</div>
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->
