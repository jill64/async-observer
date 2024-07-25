<script lang="ts">
  import { observable } from '$lib'

  let observer = observable()

  let set = $derived(
    observer.observed(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    })
  )
</script>

<button onclick={set}>Button</button>

<div>{observer.status}</div>
