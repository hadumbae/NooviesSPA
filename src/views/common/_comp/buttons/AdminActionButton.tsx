/**
 * @fileoverview Renders a full-width action button with primary title text and optional subtitle text for admin interface actions.
 */

import {forwardRef} from "react";
import {Button, ButtonProps} from "@/views/common/_comp/ui";
import {ButtonVariant} from "@/common/_types";

/** Props for the AdminActionButton component. */
type AdminButtonProps = {
    disabled?: boolean;
    variant?: ButtonVariant;
    text: string;
    subtext?: string;
    type?: "submit" | "reset" | "button" | undefined;
} & Omit<ButtonProps, "children" | "className" | "type">;

/**
 * Renders an administrative action button displaying structured title and subtext labels.
 */
export const AdminActionButton = forwardRef<HTMLButtonElement, AdminButtonProps>(
    (props, ref) => {
        const {disabled, text, subtext, variant = "primary", type = "button", ...buttonProps} = props;

        return (
            <Button
                ref={ref}
                className="w-full h-32"
                variant={variant}
                disabled={disabled}
                type={type}
                {...buttonProps}
            >
                <div className="flex flex-col space-y-1">
                    <span className="font-bold uppercase tracking-tight">{text}</span>
                    <span className="text-xs opacity-90">{subtext}</span>
                </div>
            </Button>
        );
    }
);