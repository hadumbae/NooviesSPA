/**
 * @fileoverview Slide-over panel for creating or updating Person biographical data.
 */

import {ReactElement, ReactNode} from 'react';
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {PersonFormValues} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import CountryHookFormSelect from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {useFormContext} from "react-hook-form";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/features/generic-form-context";
import AnimatedLoader from "@/common/components/loaders/AnimatedLoader.tsx";

/**
 * Props for the PersonSubmitFormPanel component.
 */
type FormPanelProps = {
    children?: ReactNode;
    className?: string;
    isEditing?: boolean;
    disableFields?: (keyof PersonFormValues)[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

/**
 * A panel-based interface for managing Person biographical details.
 */
export function PersonSubmitFormPanel(
    {children, className, isEditing, isOpen, setIsOpen, disableFields}: FormPanelProps
): ReactElement {
    const {control} = useFormContext();
    const {formID, isPending} = useRequiredContext({context: BaseFormContext});

    const sheetTitle = `${isEditing ? "Update" : "Submit"} Personal Details`;
    const sheetDescription = `Fill in the information below to ${isEditing ? "update the existing" : "create a new"} person profile.`;

    const isVisible = (field: keyof PersonFormValues) => !disableFields?.includes(field);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>{sheetTitle}</SheetTitle>
                    <SheetDescription>{sheetDescription}</SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1 mt-6">
                    <div className={cn("space-y-5", className)}>
                        {isVisible("name") && (
                            <HookFormInput
                                name="name"
                                label="Name"
                                description="Legal or stage name."
                                control={control}
                                disabled={isPending}
                            />
                        )}

                        {isVisible("biography") && (
                            <HookFormTextArea
                                name="biography"
                                label="Biography"
                                control={control}
                                description="Brief professional history."
                                disabled={isPending}
                            />
                        )}

                        {isVisible("dob") && (
                            <HookFormInput
                                name="dob"
                                label="Date Of Birth"
                                control={control}
                                type="date"
                                disabled={isPending}
                            />
                        )}

                        {isVisible("nationality") && (
                            <CountryHookFormSelect
                                name="nationality"
                                label="Nationality"
                                control={control}
                                isMulti={false}
                                disabled={isPending}
                            />
                        )}

                        <Button
                            form={formID}
                            type="submit"
                            variant="default"
                            className="w-full font-semibold"
                            disabled={isPending}
                        >
                            {isPending ? <AnimatedLoader /> : "Save Changes"}
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}