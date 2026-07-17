/**
 * @fileoverview Form view component for submitting and editing a theatre screen.
 */

import {ReactElement} from "react";
import {ScreenTypeHookFormSelect} from "@/views/admin/theatre-screens/_feat/form-inputs";
import {useFormContext} from "react-hook-form";
import {TheatreHookFormSelect} from "@/views/admin/theatres/_feat/form-input/selects/TheatreHookFormSelect.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {HookFormInput} from "@/views/common/_feat";
import {DisableFields} from "@/common/_types";
import {TheatreScreenFormValues} from "@/domains/theatre-screens";

/** Props for the TheatreScreenSubmitFormView component. */
type FormViewProps = {
    disableFields?: DisableFields<TheatreScreenFormValues>;
};

/**
 * Form view component for rendering the input fields of the theatre screen form.
 */
export function TheatreScreenFormView(
    {disableFields}: FormViewProps
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseFormContext()

    return (
        <div className="space-y-4 mb-6">
            {
                !disableFields?.theatre &&
                <TheatreHookFormSelect
                    disabled={isPending}
                    name="theatre"
                    label="Theatre"
                />
            }

            {
                !disableFields?.name &&
                <HookFormInput
                    name="name"
                    label="Name"
                    control={control}
                    disabled={isPending}
                />
            }

            {
                !disableFields?.capacity &&
                <HookFormInput
                    name="capacity"
                    label="Capacity"
                    disabled={isPending}
                    control={control}
                    type="number"
                    min={0}
                />
            }

            {
                !disableFields?.screenType &&
                <ScreenTypeHookFormSelect
                    control={control}
                    disabled={isPending}
                    name="screenType"
                    label="Screen Type"
                />
            }
        </div>
    );
}