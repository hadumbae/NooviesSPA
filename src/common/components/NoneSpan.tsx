/**
 * @file NoneSpan.tsx
 *
 * A presentational `<span>` component that renders the literal text `"None"`
 * with secondary, italic, non-selectable styling.
 *
 * This component forwards all standard `<span>` props and merges any provided
 * `className` with a predefined secondary text style.
 */
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {ComponentPropsWithoutRef} from "react";

/**
 * Renders a styled, non-interactive `"None"` label.
 *
 * @param props - Standard React `<span>` props.
 * @returns A styled `<span>` element displaying `"None"`.
 *
 * @example
 * <NoneSpan />
 *
 * @example
 * <NoneSpan className="text-sm" />
 */
const NoneSpan = (props: ComponentPropsWithoutRef<"span">) => {
    const {className, ...rem} = props;

    return (
        <span {...rem} className={cn(
            SecondaryTextBaseCSS,
            "select-none italic",
            className,
        )}>
            None
        </span>
    );
};

export default NoneSpan;
