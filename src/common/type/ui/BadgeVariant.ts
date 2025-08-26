/**
 * Defines the possible visual variants for a `Badge` component.
 *
 * @remarks
 * This type is typically used to control the styling of a badge, such as its background color,
 * border, or emphasis. It can also be `null` or `undefined` to indicate that no specific variant is applied.
 *
 * @example
 * ```ts
 * const variant: BadgeVariant = "destructive";
 * ```
 */
type BadgeVariant =
/** The default badge style. */
    "default" |
    /** A secondary style, usually less prominent. */
    "secondary" |
    /** Indicates a destructive or warning style. */
    "destructive" |
    /** A badge with an outlined style. */
    "outline" |
    /** No variant specified. */
    null |
    /** No variant specified. */
    undefined;

export default BadgeVariant;