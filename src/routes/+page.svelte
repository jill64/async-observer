<script lang="ts">
  import { observable } from '$lib'

  const { status, observed } = observable()

  $: set = (error: boolean) =>
    observed(
      () =>
        new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            error ? reject() : resolve()
          }, 3000)
        })
    )
</script>

<button on:click={set(false)}>toResolve</button>
<button on:click={set(true)}>toThrow</button>
<div>{$status}</div>
