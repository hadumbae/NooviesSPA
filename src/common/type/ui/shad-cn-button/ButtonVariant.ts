/**
 * @file ButtonVariant.ts
 * @description
 * Type alias representing the allowed `variant` values for the
 * shadcn/ui `<Button>` component.
 *
 * This matches the exact variant contract used by shadcn/ui and is
 * typically used to strongly type wrapper components or custom button APIs.
 */

/**
 * Allowed visual variants for the shadcn/ui `<Button>` component.
 *
 * Includes:
 * - `"default"` – Standard button appearance
 * - `"primary"` – Emphasized action (project-specific addition)
 * - `"destructive"` – Indicates dangerous or irreversible actions
 * - `"outline"` – Minimal outline-only styling
 * - `"secondary"` – De-emphasized alternative action
 * - `"ghost"` – Transparent button for subtle actions
 * - `"link"` – Text-only button styled like a hyperlink
 *
 * The `null` and `undefined` values support optional props where a variant
 * might be omitted and fall back to the component’s default behavior.
 */
type ButtonVariant =
    | "default"
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

export default ButtonVariant;
