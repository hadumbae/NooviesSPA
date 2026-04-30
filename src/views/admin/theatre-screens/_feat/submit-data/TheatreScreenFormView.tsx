/**
 * @fileoverview Form view component for submitting and editing a theatre screen.
 */

import {cloneElement, ReactElement} from "react";
import {ScreenTypeHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {useFormContext} from "react-hook-form";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import TheatreHookFormSelect from "@/views/admin/theatres/_feat/form-input/TheatreHookFormSelect.tsx";
import {useBaseFormContext} from "@/common/features/generic-form-context";
import {TheatreScreenFormDisableFields} from "@/views/admin/theatre-screens/_feat/submit-data/types.ts";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";

/** Props for the TheatreScreenSubmitFormView component. */
type FormViewProps = {
    disableFields?: TheatreScreenFormDisableFields;
};

/**
 * Form view component for rendering the input fields of the theatre screen form.
 */
export function TheatreScreenFormView(
    {disableFields}: FormViewProps
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext()

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
        <div className="space-y-4 mb-6">
            {
                fieldGroup.map(({render, key, element}) =>
                    render ? cloneElement(element, {key}) : null
                )
            }
        </div>
    );
}