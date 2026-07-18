/**
 * @fileoverview Form view for filtering and sorting role types in the admin dashboard.
 */

import {ReactElement} from 'react';
import {HookFormInput} from "@/views/common/_feat";
import {
    HookFormSortToggle as HookFormStateToggleButton
} from "@/views/common/_feat";
import {cn} from "@/common/_feat";
import {Separator} from "@/common/components/ui/separator.tsx";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useFormContext} from "react-hook-form";
import {RoleTypeDepartmentSelect} from "@/views/admin/role-types/_feat/form-inputs";
import {RoleTypeQueryOptionsFormValues} from "@/domains/roletypes";

/** Props for the RoleTypeQueryOptionFormView component. */
type ViewProps = Pick<FormViewProps<RoleTypeQueryOptionsFormValues>, "className" | "disableFields">;

/**
 * Form component for filtering and sorting Role Types.
 */
export function RoleTypeQueryOptionFormView(
    {disableFields, className}: ViewProps
): ReactElement {
    const {submitHandler} = useBaseFormContext();
    const {control} = useFormContext();

    if (!submitHandler) {
        throw new Error(`'${RoleTypeQueryOptionFormView.name}' requires a submitHandler.`);
    }

    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", className)}>
            <fieldset className="space-y-3">
                <div>
                    <h2 className="text-lg font-bold">Filters</h2>
                    <Separator/>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {
                        !disableFields?.roleName &&
                        <HookFormInput name="roleName" label="Role Name" control={control}/>
                    }

                    {
                        !disableFields?.department &&
                        <RoleTypeDepartmentSelect name="department" label="Department"/>
                    }
                </div>
            </fieldset>

            <fieldset className="space-y-3">
                <div>
                    <h2 className="text-lg font-bold">Sort</h2>
                    <Separator/>
                </div>

                <div className="flex flex-wrap items-center space-x-3">
                    {
                        !disableFields?.sortByRoleName &&
                        <HookFormStateToggleButton name="sortByRoleName" label="Role Name"/>
                    }

                    {
                        !disableFields?.sortByDepartment &&
                        <HookFormStateToggleButton name="sortByDepartment" label="Department"/>
                    }
                </div>
            </fieldset>
        </div>
    );
}
