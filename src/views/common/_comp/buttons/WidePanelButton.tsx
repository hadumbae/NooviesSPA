/**
 * @fileoverview A full-width button component used for toggling panel states.
 */

import {Button} from "@/common/components/ui/button.tsx";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import {LucideIcon} from "lucide-react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {Dispatch, ReactElement, SetStateAction} from "react";

/** Props for the WidePanelButton component. */
type ButtonProps = {
    className?: string;
    isActive: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    icon: LucideIcon;
    text: string;
}

/** A full-width button that toggles an active state and displays an icon with text. */
export function WidePanelButton(
    {className, isActive, setActive, text, icon: Icon}: ButtonProps
): ReactElement {
    const variant: ButtonVariant = isActive ? "secondary" : "primary";

    const onClick = () => setActive((prev) => !prev);

    return (
        <Button type="button" variant={variant} className={cn("w-full transition-none", className)} onClick={onClick}>
            <Icon/> {text}
        </Button>
    );
}
