import { FC, ReactNode, useState } from 'react';
import { Genre } from "@/pages/genres/schema/genre/Genre.types.ts";
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
 * Combines {@link FormContainerProps} with optional open-state control
 * via {@link PresetOpenState}, allowing either internal or external
 * management of the sheet's open/close behavior.
 *
 * @property children - Optional trigger element to open the panel.
 * @property className - Optional custom class name for the panel container.
 */
type PanelProps = FormContainerProps<Genre, Genre, GenreFormValues> & PresetOpenState & {
    children?: ReactNode;
    className?: string;
};

/**
 * A sheet-based panel for creating or updating a {@link Genre}.
 *
 * @remarks
 * This component wraps the {@link GenreSubmitFormContainer} inside
 * a `Sheet` UI element. It can operate in either controlled or uncontrolled mode
 * depending on whether `presetOpen` and `setPresetOpen` are provided.
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
const GenreSubmitFormPanel: FC<PanelProps> = (props) => {
    /**
     * ⚡ State ⚡
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { children, onSubmitSuccess, presetOpen, setPresetOpen, ...formOptions } = props;
    const { isEditing } = formOptions;

    /**
     * ⚡ Controlled State ⚡
     */
    const isControlled = presetOpen !== undefined && setPresetOpen !== undefined;
    const activeOpen = isControlled ? presetOpen : isOpen;
    const setActiveOpen = isControlled ? setPresetOpen : setIsOpen;

    /**
     * ⚡ Computed Values ⚡
     */
    const sheetTitle = `${isEditing ? "Update" : "Create"} Genre`;
    const sheetDescription = `${isEditing ? "Update" : "Create"} genres by submitting data.`;
    const defaultTrigger = (
        <span className="text-neutral-400 hover:text-black cursor-pointer">
            Open
        </span>
    );

    /**
     * ⚡ Handlers ⚡
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
