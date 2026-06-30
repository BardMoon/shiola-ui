<script lang="ts">
  import type { Snippet } from "svelte";
  import type { ClassValue, HTMLButtonAttributes } from "svelte/elements";
  import type { ButtonVariantType, ButtonToneType } from "../../types";

  type Props = HTMLButtonAttributes & {
    class?: ClassValue;
    children?: Snippet;

    variant?: ButtonVariantType;
    tone?: ButtonToneType;
    selected?: boolean;
    fullWidth?: boolean;
  };

  let {
    class: className,
    children,

    variant = "default",
    tone = "default",
    selected = false,
    fullWidth = false,
    ...props
  }: Props = $props();
</script>

<button
  {...props}
  type={props.type ?? "button"}
  class={[
    "flex items-center gap-1.5 px-2.5 py-0.75",
    `variant-${variant}`,
    `tone-${tone}`,
    {
      "w-full": fullWidth,
      "is-selected": selected,
    },
    className,
  ]}
>
  {@render children?.()}
</button>

<style>
  button.variant-default {
    cursor: default;
    transition:
      background-color 75ms,
      border-color 40ms,
      color 75ms;
  }
  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px var(--color-highlight);
  }
  button:disabled {
    opacity: var(--opacity-button-disabled);
    cursor: default;
  }

  /* === Default === */

  button.variant-default {
    border: 1px solid transparent;
    border-radius: var(--border-radius);

    color: var(--color-breeze-text);
    background: transparent;

    text-align: left;
  }

  button.variant-default:hover:not(:disabled) {
    background: var(--color-primary-level1);
    border-color: var(--color-primary);
  }

  button.variant-default:active:not(:disabled) {
    background: var(--color-primary-level3);
    border-color: var(--color-primary);
  }

  button.variant-default.is-selected {
    background: var(--color-primary-level2);
    border-color: transparent;
  }

  button.variant-default.is-selected:hover:not(:disabled) {
    background: var(--color-primary-level3);
    border-color: transparent;
  }

  /* === Toggle === */

  button.variant-toggle {
    border: none;
    border-radius: var(--border-radius);

    color: var(--color-breeze-text);
    background: transparent;
  }

  button.variant-toggle:hover:not(:disabled) {
    background: var(--color-primary-level2);
    border-color: transparent;
  }

  button.variant-toggle:active:not(:disabled),
  button.variant-toggle.is-selected,
  button.variant-toggle.is-selected:hover:not(:disabled) {
    background: var(--color-primary-level3);
    border-color: transparent;
  }

  /* === Text === */

  button.variant-text {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 0;
    font-size: 11px;
  }
  button.variant-text:hover {
    color: var(--color-primary);
  }

  /* === Danger === */
  button.tone-danger {
    color: var(--color-caution);
  }
  button.tone-danger:hover:not(:disabled) {
    background: var(--color-caution-level1);
    border-color: var(--color-caution);
  }
  button.tone-danger:active:not(:disabled) {
    background: var(--color-caution-level3);
    border-color: var(--color-caution);
  }
</style>
