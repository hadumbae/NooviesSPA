import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/common/lib/utils.ts";
import { IconTextCSS } from "@/common/constants/css/TextCSS.ts";

type SpanProps = ComponentPropsWithoutRef<"span">;

/**
 * Inline text wrapper styled for icon-adjacent content.
 *
 * @remarks
 * - Renders a native `<span>` element.
 * - Applies shared icon–text typography styles.
 * - Forwards all standard span props.
 *
 * @example
 * ```tsx
 * <IconTextSpan className="ml-2">
 *   Settings
 * </IconTextSpan>
 * ```
 */
const IconTextSpan = (props: SpanProps) => {
    const { children, className, ...remProps } = props;

    return (
        <span className={cn(IconTextCSS, className)} {...remProps}>
            {children}
        </span>
    );
};

export default IconTextSpan;
