<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue } from "svelte/elements";
  import type { MenuItemType } from "$lib/types";
  import { Dropdown, Button } from "$lib/components";

  type Props = {
    children: Snippet;
    class?: ClassValue;
    menu: MenuItemType[];
    selected: boolean;
    onopen: () => void;
    onhover?: () => void;
    onclose: () => void;
  };

  let {
    children,
    class: className,
    menu,
    selected,
    onopen,
    onhover,
    onclose,
  }: Props = $props();
</script>

<div class={className}>
  <Button
    fullWidth
    variant="toggle"
    class={["menu-button", "h-full text-[13px]"]}
    {selected}
    onpointerdown={(e) => {
      e.stopPropagation();
      onopen();
    }}
    onpointerenter={onhover}
  >
    {@render children?.()}
  </Button>

  {#if selected}
    <Dropdown
      items={menu}
      onclick={onclose}
      class="absolute z-50 top-full left-0 mt-0.5 p-1"
    />
  {/if}
</div>

<style>
  .menu-button {
    border-radius: var(--border-radius);
  }
</style>
