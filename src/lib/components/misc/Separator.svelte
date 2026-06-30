<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  type Props = {
    orientation?: "horizontal" | "vertical";
    class?: ClassValue;
  };

  let { orientation = "horizontal", class: className }: Props = $props();
</script>

<div
  role="separator"
  class={["separator", orientation, className]}
  aria-orientation={orientation}
></div>

<style>
  .separator {
    flex-shrink: 0;
    background: var(--color-breeze-border);
  }

  .separator.horizontal {
    height: 1px;
    margin: 0.25rem 0.5rem;
  }

  .separator.vertical {
    width: 1px;
    align-self: stretch;
    margin: 0.5rem 0.25rem;
  }
</style>
