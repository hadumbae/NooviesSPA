/**
 * @fileoverview A reusable dialog component for filtering content with support for controlled and uncontrolled states.
 *
 */

import {ReactElement, ReactNode} from 'react';
import {ListFilter} from "lucide-react";
import {cn} from "@/common/_feat";
import {UIOpenStateProps} from "@/common/_types";
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/views/common/_comp/ui";

/** Props for the PresetFilterDialog component. */
type DialogProps = UIOpenStateProps & {
    children: ReactNode;
    className?: string;
    title: string;
    description: string;
};

/**
 * A dialog component tailored for filter UIs that supports both controlled and uncontrolled open states.
 */
export function QueryFilterDialog(
    {children, className, isOpen, setIsOpen, title, description}: DialogProps
): ReactElement {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

                <Button className="bg-primary hover:bg-purple-800" onClick={() => setIsOpen(false)}>
                    Apply
                </Button>
            </DialogContent>
        </Dialog>
    );
}


