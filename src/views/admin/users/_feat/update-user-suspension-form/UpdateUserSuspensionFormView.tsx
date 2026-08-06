/**
 * @fileoverview Form view component rendering input controls for updating user suspension state.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {DisableFields} from "@/common/_types";
import {HookFormSelect} from "@/views/common/_comp";
import {HookFormCheckbox, HookFormInput} from "@/views/common/_feat";
import {UserSuspensionUpdateActionSelectOptions} from "@/domains/users/_feat/manage-user-suspension/const";
import {UpdateUserSuspensionFormValues} from "@/domains/users/_feat/manage-user-suspension/schema";

/** Props for the UpdateUserSuspensionFormView component. */
type ViewProps = {
    className?: string;
    disablePresetInputs?: boolean;
    disableFields?: DisableFields<UpdateUserSuspensionFormValues>;
};

/**
 * Renders the form fields required for updating a user's suspension status within a React Hook Form context.
 */
export function UpdateUserSuspensionFormView(
    {className, disableFields, disablePresetInputs = true}: ViewProps
): ReactElement {
    const {control} = useFormContext();

    return (
        <div className={cn("space-y-4", className)}>
            {
                !disableFields?.action &&
                <HookFormSelect
                    name="action"
                    label="Action"
                    options={UserSuspensionUpdateActionSelectOptions}
                    disabled={disablePresetInputs}
                />
            }

            {
               !disableFields?.message &&
               <HookFormInput
                   name="message"
                   label="Message"
                   control={control}
               />
            }

            {
               !disableFields?.suspend &&
               <HookFormCheckbox
                   name="suspend"
                   label="Suspend?"
                   disabled={disablePresetInputs}
               />
            }
        </div>
    );
}