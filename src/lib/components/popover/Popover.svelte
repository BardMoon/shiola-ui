<script lang="ts">
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    class?: ClassValue;
    onclose?: () => void;
    children?: Snippet;
  };

  let {
    open = true,
    class: className = "",
    onclose,
    children,
    ...props
  }: Props = $props();

  let el = $state<HTMLDivElement | null>(null);

  $effect(() => {
    if (!open || !el) return;

    el.style.transform = "";

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();

    let dx = 0;
    let dy = 0;

    if (rect.right > vw) {
      dx = vw - rect.right - 4;
    }
    if (rect.left + dx < 0) {
      dx = -rect.left + 4;
    }
    if (rect.bottom > vh) {
      dy = vh - rect.bottom - 4;
    }
    if (rect.top + dy < 0) {
      dy = -rect.top + 4;
    }

    if (dx || dy) {
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    }
  });
  function onWindowPointerDown(e: PointerEvent) {
    if (!el) return;
    if (!el.contains(e.target as Node)) {
      onclose?.();
    }
  }
  function onWindowKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onclose?.();
    }
  }
</script>

<svelte:window
  onpointerdown={open ? onWindowPointerDown : undefined}
  onkeydown={open ? onWindowKeyDown : undefined}
/>

{#if open}
  <div bind:this={el} class={["popover", className]} {...props}>
    {@render children?.()}
  </div>
{/if}

<!--
<style>
  .popover {
  }
</style> -->
