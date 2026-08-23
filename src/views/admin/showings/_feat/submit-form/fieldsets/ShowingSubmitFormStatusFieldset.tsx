/**
 * @fileoverview Fieldset for managing showing status, pricing, and configuration flags.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/_schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn, createFormFieldConfig, renderFields, useBaseMultiStepFormContext} from "@/common/_feat";
import {ShowingStatusHookFormSelect} from "@/views/admin/showings/_feat/form-inputs";

/**
 * Form fieldset for showing status and configuration.
 */
export function ShowingSubmitFormStatusFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();
    const {isPending} = useBaseMultiStepFormContext();

    const field = createFormFieldConfig({disableFields, extraDisabled: isPending});
    const fields = [
        field({
            key: "ticketPrice",
            element: <HookFormInput
                name="ticketPrice"
                label="Ticket Price"
                control={control}
                description="The base price of the showing."
                type="number"
                min={1}
                step={0.01}
                className="col-span-2"
            />
        }),
        field({
            key: "config",
            element: <>
                <HookFormCheckbox name="config.isActive" label="Is Active?"/>
                <HookFormCheckbox name="config.isSpecialEvent" label="Is Special Event?"/>
                <HookFormCheckbox name="config.canReserveSeats" label="Can Reserve Seats?"/>
            </>
        }),
        field({
            key: "status",
            element: <ShowingStatusHookFormSelect
                name="status"
                label="Status"
                control={control}
                description="The current status of the showing."
                className="col-span-2"
            />
        }),
    ];

    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <h3 className="fieldset-header">Status</h3>
                <Separator/>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {renderFields({fields})}
            </div>
        </fieldset>
    );
}
