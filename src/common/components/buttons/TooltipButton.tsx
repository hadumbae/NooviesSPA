import {forwardRef, ReactNode} from 'react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/common/components/ui/tooltip.tsx";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";

/**
 * Props for the `TooltipButton` component.
 *
 * Extends all props from `ButtonProps` and adds:
 * @property tooltipText - The content to display inside the tooltip. Can be any ReactNode.
 */
export type TooltipButtonProps = ButtonProps & {
    tooltipText: ReactNode;
};

/**
 * `TooltipButton` is a reusable button component that displays a tooltip when hovered or focused.
 *
 * This component wraps a `Button` inside a `Tooltip` from the UI library. The tooltip content is
 * provided via the `tooltipText` prop. All standard button props are supported, and the ref is
 * forwarded to the underlying `<button>` element.
 *
 * @example
 * ```tsx
 * <TooltipButton
 *   tooltipText="This is a tooltip"
 *   onClick={() => console.log("Button clicked")}
 * >
 *   Click Me
 * </TooltipButton>
 * ```
 *
 * @remarks
 * - `tooltipText` can be any valid ReactNode, allowing rich content inside the tooltip.
 * - This component uses `forwardRef`, so the `ref` points to the underlying `<button>` element.
 * - All standard `Button` props (like `variant`, `size`, `disabled`) are supported.
 *
 * @see {@link Button} for available button props.
 * @see {@link Tooltip} for tooltip behavior and customization.
 */
const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>((props, ref) => {
    const {children, tooltipText, ...buttonProps} = props;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button {...buttonProps} ref={ref}>{children}</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltipText}</p>
            </TooltipContent>
        </Tooltip>
    );
});

export default TooltipButton;
