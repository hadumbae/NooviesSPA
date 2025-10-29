import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover.tsx";
import { Button } from "@/common/components/ui/button.tsx";
import { cn } from "@/common/lib/utils.ts";
import { Ellipsis } from "lucide-react";
import { OnDeleteMutationParams } from "@/common/type/form/MutationDeleteParams.ts";
import { PresetOpenState } from "@/common/type/ui/OpenStateProps.ts";

/**
 * Props for the {@link TheatreOptions} component.
 *
 * Extends {@link OnDeleteMutationParams} for deletion handling and
 * {@link PresetOpenState} for optional controlled open state of the popover.
 *
 * @property className - Optional additional CSS classes for the trigger button.
 * @property variant - Button variant style (default, destructive, outline, secondary, ghost, link).
 * @property setEditOpen - Setter to open the edit modal.
 * @property setDeleteOpen - Setter to open the delete confirmation modal.
 */
type Props = OnDeleteMutationParams & PresetOpenState & {
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    setEditOpen: Dispatch<SetStateAction<boolean>>;
    setDeleteOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * **TheatreOptions**
 *
 * A popover menu component for theatre actions, such as editing or deleting
 * a theatre. Uses a `Button` with an ellipsis icon as the trigger and
 * renders edit/delete options inside a `PopoverContent`.
 *
 * Supports controlled or uncontrolled open state via `presetOpen` and
 * `setPresetOpen`.
 *
 * @param props - Component props of type {@link Props}.
 *
 * @example
 * ```tsx
 * import TheatreOptions from "@/pages/theatres/components/TheatreOptions";
 * import { useState } from "react";
 *
 * const MyComponent = () => {
 *   const [editOpen, setEditOpen] = useState(false);
 *   const [deleteOpen, setDeleteOpen] = useState(false);
 *
 *   return (
 *     <TheatreOptions
 *       presetOpen={false}
 *       setEditOpen={setEditOpen}
 *       setDeleteOpen={setDeleteOpen}
 *       successMessage="Theatre deleted successfully"
 *       onDeleteSuccess={() => console.log("Deleted!")}
 *     />
 *   );
 * };
 * ```
 */
const TheatreOptions: FC<Props> = (props) => {
    const { variant = "default", className, presetOpen, setPresetOpen, setEditOpen, setDeleteOpen } = props;

    const [open, setOpen] = useState<boolean>(presetOpen ?? false);
    const openState = presetOpen ?? open;
    const setOpenState = setPresetOpen ?? setOpen;

    return (
        <Popover open={openState} onOpenChange={setOpenState}>
            <PopoverTrigger asChild>
                <Button variant={variant} className={cn(className)}>
                    <Ellipsis />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <Button variant="link" onClick={() => setEditOpen(true)}>
                    Edit
                </Button>

                <Button variant="link" onClick={() => setDeleteOpen(true)}>
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default TheatreOptions;
