<script lang="ts">
  import type { Component } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { ChevronRight } from "@lucide/svelte";
  import { Button } from "shiola-ui";
  import type { ButtonToneType } from "$lib/types";

  type Props = HTMLButtonAttributes & {
    label: string;
    icon?: Component;
    tone?: ButtonToneType;
    shortcut?: string;
    selected?: boolean;
    hasChildren?: boolean;
    onclick?: (e: MouseEvent) => void;
  };
  let {
    label,
    icon: Icon,
    tone,
    shortcut,
    selected = false,
    hasChildren = false,
    onclick,
  }: Props = $props();
</script>

<Button
  fullWidth
  class={["menu-item"]}
  role="menuitem"
  {selected}
  {tone}
  {onclick}
  onpointerdown={(e) => e.stopPropagation()}
>
  {#if Icon}
    <Icon size={13} />
  {/if}
  <span class="label">{label}</span>
  {#if hasChildren}
    <span class="chevron"><ChevronRight size={16} /></span>
  {:else if shortcut}
    <span class="shortcut">{shortcut}</span>
  {/if}
</Button>

<style>
  :global(.menu-item) {
    font-size: 0.8125rem;
  }
  .label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chevron {
    position: absolute;
    right: 4px;
    color: var(--color-text-sub);
  }
  .shortcut {
    flex-shrink: 0;
    margin-right: 0.1rem;
    color: var(--color-text-muted);
    font-size: 0.75rem;
  }
</style>
