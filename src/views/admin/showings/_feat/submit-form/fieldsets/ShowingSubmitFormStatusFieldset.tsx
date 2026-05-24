/**
 * @fileoverview Fieldset for managing showing status, pricing, and configuration flags.
 */

import {ReactElement} from 'react';
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormCheckbox from "@/common/components/forms/checkbox/HookFormCheckbox.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {ShowingFormValues} from "@/domains/showings/schema/form";
import {FormFieldsetProps} from "@/common/_feat/submit-data/formTypes.ts";
import {cn} from "@/common/lib/utils.ts";
import {useFormContext} from "react-hook-form";
import {ShowingStatusHookFormSelect} from "@/views/admin/showings/_feat/form-inputs";

/**
 * Form fieldset for showing status and configuration.
 */
export function ShowingSubmitFormStatusFieldset(
    {disableFields, className}: Omit<FormFieldsetProps<ShowingFormValues>, "isNestedView">
): ReactElement {
    const {control} = useFormContext();

    return (
        <fieldset className={cn("space-y-3", className)}>
            <div>
                <PrimaryHeaderText>Status</PrimaryHeaderText>
                <Separator/>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {
                    !disableFields?.ticketPrice && (
                        <HookFormInput
                            name="ticketPrice"
                            label="Ticket Price"
                            control={control}
                            description="The base price of the showing."
                            type="number"
                            min={1}
                            step={0.01}
                            className="col-span-2"
                        />
                    )
                }

                {
                    !disableFields?.config && (<>
                        <HookFormCheckbox
                            name="config.isActive"
                            label="Is Active?"
                            control={control}
                        />

                        <HookFormCheckbox
                            name="config.isSpecialEvent"
                            label="Is Special Event?"
                            control={control}
                        />

                        <HookFormCheckbox
                            name="config.canReserveSeats"
                            label="Can Reserve Seats?"
                            control={control}
                        />
                    </>)
                }

                {
                    !disableFields?.status && (
                        <ShowingStatusHookFormSelect
                            name="status"
                            label="Status"
                            control={control}
                            description="The current status of the showing."
                            className="col-span-2"
                        />
                    )
                }
            </div>
        </fieldset>
    );
}
