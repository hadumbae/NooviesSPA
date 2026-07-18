/**
 * @fileoverview Slide-over panel for creating or updating Person biographical data.
 */

import {ReactElement, ReactNode} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {HookFormInput, HookFormTextArea} from "@/views/common/_feat";
import useRequiredContext from "@/common/_feat/use-context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/_feat/generic-form-context";
import {AnimatedLoader} from "@/views/common/_comp/loaders/AnimatedLoader.tsx";
import {UIOpenStateProps} from "@/common/_types";
import {PersonFormValues} from "@/domains/persons";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";
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

/**
 * Props for the PersonSubmitFormPanel component.
 */
type FormPanelProps = UIOpenStateProps & {
    children?: ReactNode;
    className?: string;
    isEditing?: boolean;
    disableFields?: (keyof PersonFormValues)[];
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
                            <HookFormSelect
                                name="nationality"
                                label="Nationality"
                                options={ISO3166Alpha2CountryOptions}
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
                            {isPending ? <AnimatedLoader/> : "Save Changes"}
                        </Button>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}