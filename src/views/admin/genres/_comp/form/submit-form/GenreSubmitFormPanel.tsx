/**
 * @file Slide-over panel (Sheet) for managing the Genre submission lifecycle.
 * @filename GenreSubmitFormPanel.tsx
 */

import {FC, ReactNode, useState} from 'react';
import {GenreFormValues} from "@/domains/genres/schema/form/GenreForm.types.ts";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import GenreSubmitFormContainer from "@/views/admin/genres/_comp/form/submit-form/GenreSubmitFormContainer.tsx";
import {FormContainerProps} from "@/common/type/form/HookFormProps.ts";
import {PresetOpenState} from "@/common/type/ui/OpenStateProps.ts";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {Genre} from "@/domains/genres/schema/genre/GenreSchema.ts";

/**
 * Props for the {@link GenreSubmitFormPanel} component.
 */
type PanelProps =
    FormContainerProps<Genre, Genre, GenreFormValues> &
    PresetOpenState & {
    /** Element used to trigger the opening of the sheet. */
    children?: ReactNode;

    /** Optional custom CSS classes for the sheet layout. */
    className?: string;
};

/**
 * A UI wrapper that encapsulates the Genre form within a side-panel sheet.
 * @param props - Component {@link PanelProps}.
 */
const GenreSubmitFormPanel: FC<PanelProps> = (props) => {
    /** Internal state for uncontrolled usage. */
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {children, onSubmitSuccess, presetOpen, setPresetOpen, ...formOptions} = props;
    const {isEditing} = formOptions;

    /** Determines if visibility is managed by a parent component. */
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    const sheetTitle = `${isEditing ? "Update" : "Create"} Genre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} genres by submitting data.`;

    /** Fallback trigger if no children are provided. */
    const defaultTrigger = (
        <span className="text-neutral-400 hover:text-black cursor-pointer">
            Open
        </span>
    );

    /**
     * Intercepts the success event to close the UI panel
     * before notifying the parent component.
     */
    const closeOnSubmit = (genre: Genre) => {
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