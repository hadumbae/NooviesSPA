/**
 * @fileoverview Slide-over panel (Sheet) component for Theatre Screen data submission.
 * Handles the visual layout of form fields and the trigger mechanism for the side panel.
 */

import {cloneElement, ReactElement} from 'react';
import {ScrollArea} from "@/common/components/ui/scroll-area.tsx";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/common/components/ui/Sheet";
import {TheatreScreenFormValues} from "@/domains/theatre-screens/_feat/submit-data";
import TheatreHookFormSelect from "@/views/admin/theatres/_feat/form-input/TheatreHookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {ScreenTypeHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {Button} from "@/common/components/ui/button.tsx";
import {UIOpenStateProps} from "@/common/types";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {useFormContext} from "react-hook-form";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";
import {BaseFormContext} from "@/common/features/generic-form-context";
import {FormViewProps} from "@/common/features/submit-data/formTypes.ts";

/**
 * Props for the ScreenSubmitFormPanel component.
 */
type FormPanelProps = UIOpenStateProps & FormViewProps<TheatreScreenFormValues> & {
    title?: string;
    description?: string;
};

/**
 * A side-drawer panel that renders Theatre Screen form inputs.
 */
export function TheatreScreenSubmitFormPanel(
    {children, title, description, isOpen, setIsOpen, disableFields}: FormPanelProps
): ReactElement {
    const {control} = useFormContext();
    const {formID, isPending} = useRequiredContext({context: BaseFormContext});

    const fieldGroup: HookFormField[] = [
        {
            key: "theatre-select",
            render: !disableFields?.theatre,
            element: (
                <TheatreHookFormSelect
                    control={control}
                    disabled={isPending}
                    name="theatre"
                    label="Theatre"
                />
            )
        },
        {
            key: "name-input",
            render: !disableFields?.name,
            element: (
                <HookFormInput
                    name="name"
                    label="Name"
                    control={control}
                    disabled={isPending}
                />
            ),
        },
        {
            key: "capacity-input",
            render: !disableFields?.capacity,
            element: (
                <HookFormInput
                    name="capacity"
                    label="Capacity"
                    disabled={isPending}
                    control={control}
                    type="number"
                    min={0}
                />
            ),
        },
        {
            key: "screen-type-select",
            render: !disableFields?.screenType,
            element: (
                <ScreenTypeHookFormSelect
                    control={control}
                    disabled={isPending}
                    name="screenType"
                    label="Screen Type"
                />
            ),
        },
    ];

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>{children ?? <Button variant="outline">Open</Button>}</SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>
                        {title ?? "Submit Screen Data"}
                    </SheetTitle>
                    <SheetDescription>
                        {description ?? "Input screen data and submit it."}
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-grow px-1 mt-4">
                    <div className="space-y-4 mb-6">
                        {
                            fieldGroup.map(({render, key, element}) =>
                                render ? cloneElement(element, {key}) : null
                            )
                        }
                    </div>

                    <Button
                        form={formID}
                        type="submit"
                        variant="default"
                        className="w-full bg-primary"
                        disabled={isPending}
                    >
                        {isPending ? "Submitting..." : "Submit"}
                    </Button>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}