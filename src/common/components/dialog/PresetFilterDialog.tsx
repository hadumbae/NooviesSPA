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
import { ListFilter } from "lucide-react";
import { Button } from "@/common/components/ui/button.tsx";
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for the PresetFilterDialog component.
 * Extends {@link PresetOpenState} to support both controlled and uncontrolled
 * open state management while rendering a filter-themed dialog.
 */
type PresetFilterDialogProps = PresetOpenState & {
    /** Main content of the dialog, typically filter form fields. */
    children: ReactNode;

    /** Optional custom class for styling the trigger button. */
    className?: string;

    /** Dialog title displayed in the header. */
    title: string;

    /** Dialog description displayed below the title. */
    description: string;
};

/**
 * **PresetFilterDialog** — a reusable dialog component tailored for filter UIs.
 *
 * It features a filter icon trigger (`ListFilter`) and supports both controlled
 * and uncontrolled open states through {@link PresetOpenState}.
 *
 * The dialog includes:
 * - A header with `title` and `description`
 * - Custom content via `children`
 * - A “See Results” button that closes the dialog
 *
 * ### Controlled vs Uncontrolled Usage
 * - **Controlled:** Pass both `presetOpen` and `setPresetOpen` props.
 * - **Uncontrolled:** Omit both props and rely on internal state.
 *
 * ### Example
 * ```tsx
 * <PresetFilterDialog
 *   title="Filter Movies"
 *   description="Narrow down your movie selection by genre and rating."
 * >
 *   <GenreFilter />
 *   <RatingFilter />
 * </PresetFilterDialog>
 * ```
 */
const PresetFilterDialog: FC<PresetFilterDialogProps> = (props) => {
    const {
        className,
        presetOpen,
        setPresetOpen,
        title,
        description,
        children,
    } = props;

    /** Internal fallback open state (used if uncontrolled). */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /** Whether the component is being controlled via props. */
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;

    /** Active open state (from props if controlled, otherwise internal). */
    const activeOpen = isControlled ? presetOpen : isOpen;

    /** Setter for the active open state (external or internal). */
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    return (
        <Dialog open={activeOpen} onOpenChange={setActiveOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="link"
                    className={cn(
                        "w-fit",
                        "text-neutral-400 hover:text-black",
                        "dark:text-neutral-500 hover:text-white",
                        className
                    )}
                >
                    <ListFilter /> Filters
                </Button>
            </DialogTrigger>

            <DialogContent className="dark:bg-dark">
                <DialogHeader>
                    <DialogTitle className="dark:text-white">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {children}

                <Button
                    className="bg-primary hover:bg-purple-800"
                    onClick={() => setActiveOpen(false)}
                >
                    See Results
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default PresetFilterDialog;
