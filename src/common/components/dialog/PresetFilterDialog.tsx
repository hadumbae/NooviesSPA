/**
 * @fileoverview A reusable dialog component for filtering content with support for controlled and uncontrolled states.
 *
 */

import {ReactElement, ReactNode, useState} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import {ListFilter} from "lucide-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/common/components/ui";

/** Props for the PresetFilterDialog component. */
type DialogProps = PresetOpenState & {
    children: ReactNode;
    className?: string;
    title: string;
    description: string;
};

/**
 * A dialog component tailored for filter UIs that supports both controlled and uncontrolled open states.
 */
function PresetFilterDialog(
    {children, className, presetOpen, setPresetOpen, title, description}: DialogProps
): ReactElement {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;

    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    return (
        <Dialog open={activeOpen} onOpenChange={setActiveOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="link" className={cn("hover-button w-fit", className)}>
                    <ListFilter/> Filters
                </Button>
            </DialogTrigger>

            <DialogContent className="dark:bg-dark">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}

                <Button className="bg-primary hover:bg-purple-800" onClick={() => setActiveOpen(false)}>
                    Apply
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default PresetFilterDialog;
