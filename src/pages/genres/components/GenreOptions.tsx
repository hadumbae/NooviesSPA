import {FC, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/ui/popover';
import {Button} from "@/common/components/ui/button.tsx";
import {Ellipsis} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import {FormMutationOnSubmitParams} from "@/common/type/form/FormMutationResultParams.ts";
import GenreSubmitFormPanel from "@/pages/genres/components/form/GenreSubmitFormPanel.tsx";
import GenreDeleteWarningDialog from "@/pages/genres/components/dialog/GenreDeleteWarningDialog.tsx";

/**
 * Props for the `GenreOptions` component.
 *
 * @remarks
 * - Extends `FormMutationOnSubmitParams`, excluding `onSubmitSuccess` and `onSubmitError`.
 * - Provides additional configuration for the genre options popover.
 *
 * @property genre - The genre data used for editing or deletion.
 * @property variant - Optional button variant to control appearance (e.g., "default", "destructive").
 * @property className - Optional custom class names for styling the trigger button.
 * @property onSubmitSuccess - Optional callback invoked after successful form submission or deletion.
 * @property onSubmitError - Optional callback invoked if an error occurs during submission or deletion.
 */
type OptionProps = Omit<FormMutationOnSubmitParams, "onSubmitSuccess" | "onSubmitError"> & {
    genre: GenreDetails;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
    onSubmitSuccess?: () => void;
    onSubmitError?: (error: unknown) => void;
}

/**
 * `GenreOptions` is a UI component that renders a popover menu for managing a genre item.
 *
 * @remarks
 * The popover includes options to edit or delete the genre.
 * On successful form submission or deletion, the popover automatically closes.
 *
 * @param params - Props to configure the genre options component.
 *
 * @returns A JSX element that provides edit and delete functionality via popover.
 *
 * @example
 * ```tsx
 * <GenreOptions
 *   genre={someGenre}
 *   variant="outline"
 *   onSubmitSuccess={() => console.log("Updated or deleted")}
 * />
 * ```
 */
const GenreOptions: FC<OptionProps> = (params) => {
    const {genre, variant = "default", className = "", onSubmitSuccess} = params;

    const [open, setOpen] = useState<boolean>(false);

    const {_id: genreID} = genre;
    const closePopover = () => {
        setOpen(false);
        onSubmitSuccess && onSubmitSuccess();
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={variant} className={cn(className)}>
                    <Ellipsis/>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <GenreSubmitFormPanel isEditing={true} genre={genre} onSubmitSuccess={closePopover}>
                    <Button variant="link">Edit</Button>
                </GenreSubmitFormPanel>

                <GenreDeleteWarningDialog genreID={genreID}>
                    <Button variant="link" onSubmit={closePopover}>
                        Delete
                    </Button>
                </GenreDeleteWarningDialog>
            </PopoverContent>
        </Popover>
    );
};

export default GenreOptions;
