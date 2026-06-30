<script lang="ts">
  import type { ClassValue, HTMLAttributes } from "svelte/elements";
  import type { MenuItemType } from "$lib/types";
  import { Popover, Dropdown, DropdownItem, Separator } from "$lib/components";

  type Props = HTMLAttributes<HTMLUListElement> & {
    class?: ClassValue;
    items: MenuItemType[];
    open?: boolean;
    onclick?: () => void;
    onclose?: () => void;
  };
  let {
    class: className = "",
    items,
    open = true,
    onclick,
    onclose,
    style,
    ...props
  }: Props = $props();

  let hoveredIndex = $state<number | null>(null);
</script>

<Popover {open} {onclose} class={["menu", className]} {style}>
  <ul role="menu" oncontextmenu={(e) => e.preventDefault()} {...props}>
    {#each items as item, i}
      {#if item.type === "separator"}
        <Separator />
      {:else if item.children?.length}
        <li
          role="none"
          class="relative"
          onpointerenter={() => (hoveredIndex = i)}
          onpointerleave={() => (hoveredIndex = null)}
        >
          <DropdownItem
            label={item.label}
            icon={item.icon}
            shortcut={item.shortcut}
            disabled={item.disabled}
            tone={item.tone}
            hasChildren={true}
            selected={hoveredIndex === i}
            onclick={(e) => e.stopPropagation()}
          />
          {#if hoveredIndex === i}
            <Popover
              open={hoveredIndex === i}
              class="absolute z-50 top-0 left-full"
            >
              <Dropdown items={item.children} {onclick} class="p-1" />
            </Popover>
          {/if}
        </li>
      {:else}
        <DropdownItem
          label={item.label}
          icon={item.icon}
          shortcut={item.shortcut}
          disabled={item.disabled}
          tone={item.tone}
          {onclick}
        />
      {/if}
    {/each}
  </ul>
</Popover>

<style>
  :global(.menu) {
    min-width: 10rem;
    max-width: 18rem;
    background: var(--color-breeze-view);
    border: 1px solid var(--color-breeze-border);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
</style>
