<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { Button } from "$lib/components";

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: { type: "select" },
        options: ["default", "toggle", "text"],
      },
      tone: {
        control: { type: "select" },
        options: ["default", "danger"],
      },
      selected: { control: "boolean" },
      fullWidth: { control: "boolean" },
      disabled: { control: "boolean" },
    },
    args: {
      variant: "default",
      tone: "default",
      selected: false,
      fullWidth: false,
      disabled: false,
    },
  });
</script>

<Story name="Default">
  {#snippet template(args)}
    <Button {...args}>Button</Button>
  {/snippet}
</Story>

<Story name="Toggle" args={{ variant: "toggle" }}>
  {#snippet template(args)}
    <Button {...args}>Toggle</Button>
  {/snippet}
</Story>

<Story name="Text" args={{ variant: "text" }}>
  {#snippet template(args)}
    <Button {...args}>TextLink</Button>
  {/snippet}
</Story>

<Story name="Danger" args={{ tone: "danger" }}>
  {#snippet template(args)}
    <Button {...args}>Delete</Button>
  {/snippet}
</Story>

<Story name="Selected" args={{ selected: true }}>
  {#snippet template(args)}
    <Button {...args}>選択中</Button>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
  {#snippet template(args)}
    <Button {...args}>無効</Button>
  {/snippet}
</Story>

<Story name="FullWidth" args={{ fullWidth: true }}>
  {#snippet template(args)}
    <div style="width: 300px;">
      <Button {...args}>横幅いっぱい</Button>
    </div>
  {/snippet}
</Story>

<Story name="AllVariants">
  {#snippet template()}
    <div
      style="display: flex; gap: 8px; flex-direction: column; align-items: flex-start;"
    >
      <Button variant="default">Default</Button>
      <Button variant="toggle">Toggle</Button>
      <Button variant="text">Text</Button>
      <Button tone="danger">Danger</Button>
      <Button selected>Selected</Button>
      <Button disabled>Disabled</Button>
    </div>
  {/snippet}
</Story>
