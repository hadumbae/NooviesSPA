/**
 * @fileoverview Slide-over panel for managing the Genre submission lifecycle.
 */

import {ReactElement, ReactNode} from 'react';
import {useFormContext} from "react-hook-form";
import {
    Button,
    ScrollArea,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {GenreFormData} from "@/domains/genres/_feat/submit-form";
import {DisableFields, UIOpenStateProps} from "@/common/types";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useLockForFormUI} from "@/common/hooks/forms/useLockForFormUI.ts";

/** Props for the GenreSubmitFormPanel component. */
type PanelProps = UIOpenStateProps & {
    children?: ReactNode;
    className?: string;
    disableFields?: DisableFields<GenreFormData>;
}

/**
 * A slide-over panel that renders fields for creating or updating Genres.
 */
export function GenreSubmitFormPanel(
    {children, isOpen, setIsOpen, disableFields}: PanelProps
): ReactElement {
    const {control} = useFormContext();
    const {formID, isPending, isError, isEditing} = useBaseFormContext();

    const actionLabel = isEditing ? "Update" : "Create";
    const {isUILocked} = useLockForFormUI({
        isContentOpen: isOpen,
        isMutationPending: isPending,
        isMutationError: isError,
    });

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col space-y-2">
                <SheetHeader>
                    <SheetTitle>{actionLabel} Genre</SheetTitle>
                    <SheetDescription>{actionLabel} genres by submitting the form below.</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <div className="space-y-5">
                        {
                            !disableFields?.name &&
                            <HookFormInput
                                name="name"
                                label="Name"
                                description="The name of the genre."
                                control={control}
                            />
                        }

                        {
                            !disableFields?.description &&
                            <HookFormTextArea
                                name="description"
                                label="Description"
                                control={control}
                                description="A brief description of the genre."
                            />
                        }

                        <Button
                            form={formID}
                            variant="primary"
                            type="submit"
                            className="w-full"
                            disabled={isUILocked}
                        >
                            {isPending ? "Submitting..." : actionLabel}
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}