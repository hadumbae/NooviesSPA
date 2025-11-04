import { FC, ReactNode, useState } from 'react';
import { Genre } from "@/pages/genres/schema/genre/Genre.types.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/sheet.tsx";
import { GenreFormValues } from "@/pages/genres/schema/form/GenreForm.types.ts";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import GenreSubmitFormContainer from "@/pages/genres/components/form/GenreSubmitFormContainer.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";

/**
 * Props for the {@link GenreSubmitFormPanel} component.
 *
 * @remarks
 * Extends {@link FormContainerProps} with additional layout and trigger options
 * for rendering the genre submit form inside a sheet panel.
 *
 * @property children - Optional custom trigger element for opening the form panel.
 * @property className - Optional class name applied to the panel container.
 */
type PanelProps = FormContainerProps<Genre, Genre, GenreFormValues> & {
    children?: ReactNode;
    className?: string;
};

/**
 * A sheet panel that wraps the genre submission form.
 *
 * @remarks
 * This component provides a slide-over panel UI (using the `Sheet` component)
 * to create or update a {@link Genre}.
 * It internally manages open/close state and integrates with the
 * {@link GenreSubmitFormContainer} for form and mutation logic.
 *
 * The panel automatically updates its title and description based on
 * whether it is in **create** or **edit** mode.
 *
 * On successful submission, the panel closes automatically and calls
 * the `onSubmitSuccess` callback if provided.
 *
 * @example
 * ```tsx
 * <GenreSubmitFormPanel
 *   isEditing={false}
 *   onSubmitSuccess={refreshGenres}
 * >
 *   <Button>Create Genre</Button>
 * </GenreSubmitFormPanel>
 * ```
 */
const GenreSubmitFormPanel: FC<PanelProps> = (params) => {
    /** Manages the open/closed state of the sheet panel. */
    const [open, setOpen] = useState<boolean>(false);

    const { children, onSubmitSuccess, ...formOptions } = params;
    const { isEditing } = formOptions;

    /** Dynamic sheet title based on create/edit mode. */
    const sheetTitle = `${isEditing ? "Update" : "Create"} Genre`;

    /** Dynamic description displayed below the title. */
    const sheetDescription = `${isEditing ? "Update" : "Create"} genres by submitting data.`;

    /** Default trigger element if none is provided via children. */
    const defaultOpen = (
        <span className="text-neutral-400 hover:text-black cursor-pointer">
            Open
        </span>
    );

    /**
     * Closes the panel after a successful form submission
     * and invokes the `onSubmitSuccess` callback if available.
     */
    const closeOnSubmit = (genre: Genre) => {
        setOpen(false);
        onSubmitSuccess?.(genre);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children ? children : defaultOpen}
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow">
                    <GenreSubmitFormContainer
                        onSubmitSuccess={closeOnSubmit}
                        {...formOptions}
                    />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default GenreSubmitFormPanel;
