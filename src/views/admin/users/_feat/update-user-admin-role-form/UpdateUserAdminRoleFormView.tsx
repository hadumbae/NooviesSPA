/**
 * @fileoverview Form view component rendering input controls for updating user administrative roles.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {DisableFields} from "@/common/_types";
import {cn} from "@/common/_feat";
import {HookFormMultiSelect, HookFormSelect} from "@/views/common/_comp";
import {HookFormInput} from "@/views/common/_feat";
import {UserRoleSelectOptions} from "@/domains/users/_const";
import {UserRoleUpdateActionSelectOptions} from "@/domains/users/_feat/manage-user-roles/const";
import {UpdateUserAdminRoleFormValues} from "@/domains/users/_feat/manage-user-roles/manage-admin-role/schema";

/** Props for the UpdateUserAdminRoleFormView component. */
type ViewProps = {
    disablePresetInputs?: boolean;
    disableFields?: DisableFields<UpdateUserAdminRoleFormValues>;
    className?: string;
};

/**
 * Renders the form fields required for updating a user's administrative roles within a React Hook Form context.
 */
export function UpdateUserAdminRoleFormView(
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
                    options={UserRoleUpdateActionSelectOptions}
                    disabled={disablePresetInputs}
                />
            }

            {
                !disableFields?.roles &&
                <HookFormMultiSelect
                    name="roles"
                    label="Role"
                    options={UserRoleSelectOptions}
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
        </div>
    );
}