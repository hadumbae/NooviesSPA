/**
 * @file GenreSubmitFormPanel.tsx
 *
 * Sheet-based panel for creating or updating `Genre` entities.
 *
 * Acts as a UI wrapper around {@link GenreSubmitFormContainer}, providing:
 * - Controlled or uncontrolled open/close behavior
 * - Sheet layout, title, and description
 * - Automatic close-on-success handling
 */

import { FC, ReactNode, useState } from 'react';
import {Genre, GenreDetails} from "@/pages/genres/schema/genre/Genre.types.ts";
import { GenreFormValues } from "@/pages/genres/schema/form/GenreForm.types.ts";
import { ScrollArea } from "@/common/components/ui/scroll-area.tsx";
import GenreSubmitFormContainer from "@/pages/genres/components/form/GenreSubmitFormContainer.tsx";
import { FormContainerProps } from "@/common/type/form/HookFormProps.ts";
import { PresetOpenState } from "@/common/type/ui/OpenStateProps.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";

/**
 * Props for the {@link GenreSubmitFormPanel} component.
 *
 * @remarks
 * Extends {@link FormContainerProps} and {@link PresetOpenState} to support
 * both controlled and uncontrolled sheet visibility.
 */
type PanelProps =
    FormContainerProps<GenreDetails, Genre, GenreFormValues> &
    PresetOpenState & {
    /** Optional trigger element for opening the panel. */
    children?: ReactNode;

    /** Optional custom class name for the sheet content. */
    className?: string;
};

/**
 * **GenreSubmitFormPanel**
 *
 * Sheet-based UI container for genre creation and editing.
 *
 * @remarks
 * - Wraps {@link GenreSubmitFormContainer} inside a `Sheet`
 * - Automatically switches between controlled and uncontrolled modes
 * - Closes the panel after a successful submit
 *
 * @example
 * ```tsx
 * <GenreSubmitFormPanel isEditing>
 *   <Button>Edit Genre</Button>
 * </GenreSubmitFormPanel>
 * ```
 */
const GenreSubmitFormPanel: FC<PanelProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { children, onSubmitSuccess, presetOpen, setPresetOpen, ...formOptions } = props;
    const { isEditing } = formOptions;

    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    const sheetTitle = `${isEditing ? "Update" : "Create"} Genre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} genres by submitting data.`;
    const defaultTrigger = (
        <span className="text-neutral-400 hover:text-black cursor-pointer">
            Open
        </span>
    );

    const closeOnSubmit = (genre: GenreDetails) => {
        setActiveOpen(false);
        onSubmitSuccess?.(genre);
    };

    return (
        <Sheet open={activeOpen} onOpenChange={setActiveOpen}>
            <SheetTrigger asChild>
                {children ?? defaultTrigger}
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
