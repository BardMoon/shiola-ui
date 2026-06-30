import type { Component } from "svelte";
export type ButtonItemType = {
    type: "button";
    label: string;
    icon?: Component;
    shortcut?: string;
    disabled?: boolean;
    tone?: ButtonToneType;
    onclick?: () => void;
};
export type ButtonVariantType = "default" | "vanilla" | "toggle" | "text";
export type ButtonToneType = "default" | "danger";
export type ToggleItemType<T extends string = string> = Omit<ButtonItemType, "type" | "onclick"> & {
    type: "toggle";
    value: T;
};
