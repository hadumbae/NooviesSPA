import { FC, ReactNode, useState } from 'react';
import { PresetOpenState } from "@/common/type/ui/OpenStateProps.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import { LucideIcon } from "lucide-react";
import { Button } from "@/common/components/ui/button.tsx";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import { cn } from "@/common/lib/utils.ts";
import ButtonSize from "@/common/type/ui/shad-cn-button/ButtonSize.ts";

/**
 * Props for the PresetDialog component.
 * Combines controlled/uncontrolled open state handling with
 * dialog customization options.
 */
type PresetDialogProps = PresetOpenState & {
    /** Content of the dialog. Typically the main body of the dialog. */
    children: ReactNode;

    /** Additional className to apply to the trigger button. */
    className?: string;

    /** The title text displayed in the dialog header. */
    title: string;

    /** The description text displayed below the title in the dialog header. */
    description: string;

    /** Optional icon to render inside the trigger button. */
    icon?: LucideIcon;

    /** Text for the trigger button. Defaults to `"Open"`. */
    triggerText?: string;

    /** Variant of the trigger button. Defaults to `"outline"`. */
    triggerVariant?: ButtonVariant;

    /** Size of the trigger button. */
    triggerSize?: ButtonSize;
};

/**
 * PresetDialog component renders a reusable dialog with optional
 * controlled open state, a trigger button, and custom content.
 *
 * Supports both controlled and uncontrolled open state:
 * - Controlled: `presetOpen` and `setPresetOpen` props are provided.
 * - Uncontrolled: Internal state `isOpen` is used.
 *
 * Example usage:
 * ```tsx
 * <PresetDialog
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item?"
 *   triggerText="Delete"
 *   triggerVariant="destructive"
 * >
 *   <p>This action cannot be undone.</p>
 * </PresetDialog>
 * ```
 */
const PresetDialog: FC<PresetDialogProps> = (props) => {
    const {
        className,
        presetOpen,
        setPresetOpen,
        title,
        description,
        icon: Icon,
        triggerVariant = "outline",
        triggerText = "Open",
        triggerSize,
        children,
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Determine if component is controlled externally or using internal state
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    return (
        <Dialog open={activeOpen} onOpenChange={setActiveOpen}>
            <DialogTrigger asChild>
                <Button
                    size={triggerSize}
                    variant={triggerVariant}
                    className={cn("w-fit text-neutral-400 hover:text-black", className)}
                >
                    {Icon && <Icon />} {triggerText}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
};

export default PresetDialog;
