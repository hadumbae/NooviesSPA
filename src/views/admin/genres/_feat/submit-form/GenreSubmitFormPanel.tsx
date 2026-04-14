/**
 * @fileoverview Slide-over panel (Sheet) for managing the Genre submission lifecycle.
 */

import {ReactElement, ReactNode} from 'react';
import {useFormContext} from "react-hook-form";
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";
import {GenreFormContext, GenreFormData, GenreFormSchema} from "@/domains/genres/_feat/submit-form";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

/** Props for the GenreSubmitFormPanel component. */
interface PanelProps {
    children?: ReactNode;
    className?: string;
    isEditing?: boolean;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    disableFields?: Array<keyof GenreFormData>;
}

/**
 * A slide-over panel that renders fields for creating or updating Genres.
 * Requires being wrapped in a Form provider and GenreFormContext.
 */
export function GenreSubmitFormPanel(
    {children, isOpen, setIsOpen, disableFields, isEditing = false}: PanelProps
): ReactElement {
    const {control} = useFormContext();
    const {formID, isPending} = useRequiredContext({context: GenreFormContext});

    const activeFields = getActiveSchemaInputFields({
        schema: GenreFormSchema,
        disableFields,
    });

    const actionLabel = isEditing ? "Update" : "Create";

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{actionLabel} Genre</SheetTitle>
                    <SheetDescription>
                        {actionLabel} genres by submitting the form below.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 mt-4">
                    <div className="space-y-4 pr-4">
                        {activeFields.name && (
                            <HookFormInput
                                name="name"
                                label="Name"
                                description="The name of the genre."
                                control={control}
                            />
                        )}

                        {activeFields.description && (
                            <HookFormTextArea
                                name="description"
                                label="Description"
                                control={control}
                                description="A brief description of the genre."
                            />
                        )}

                        <Button
                            form={formID}
                            type="submit"
                            className={cn(PrimaryButtonCSS, "w-full")}
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}