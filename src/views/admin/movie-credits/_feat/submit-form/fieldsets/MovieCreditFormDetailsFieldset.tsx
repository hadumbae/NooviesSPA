/**
 * @fileoverview Fieldset component for movie credit basic details within a form.
 */

import {ReactElement, useEffect, useRef} from "react";
import {RoleTypeDepartmentRadioGroup, RoleTypeFormSelect} from "@/views/admin/role-types";
import {HookFormInput} from "@/views/common/_feat";
import {useFormContext} from "react-hook-form";
import {cn, createFormFieldConfig, FormViewProps, useBaseFormContext} from "@/common/_feat";
import {ConditionalRenderConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {renderFields} from "@/common/_feat/submit-data";
import {MovieCreditFormValues} from "@/domains/movie-credits";
import {PersonFormSelect} from "@/views/admin/persons";

/**
 * Fieldset containing inputs for person, role type, and credit display names.
 */
export function MovieCreditFormDetailsFieldset(
    {className, disableFields, hideFields}: FormViewProps<MovieCreditFormValues>
): ReactElement {
    const isHydrated = useRef<boolean>(false);
    const {watch, control, resetField} = useFormContext();
    const {isPending} = useBaseFormContext();

    const department = watch("department");

    useEffect(() => {
        if (!isHydrated.current) {
            isHydrated.current = true;
            return;
        }

        resetField("roleType");
    }, [department]);

    const field = createFormFieldConfig({disableFields, hideFields, extraDisabled: isPending});

    const fields: ConditionalRenderConfig[] = [
        field({
            key: "department",
            element: <RoleTypeDepartmentRadioGroup
                name="department"
                label="Department"
                className="flex flex-row justify-start space-x-5"
            />
        }),
        field({
            key: "person",
            element: <PersonFormSelect
                name="person"
                label="Person"
            />
        }),
        field({
            key: "roleType",
            element: <RoleTypeFormSelect
                name="roleType"
                label="Role Type"
                filters={{department}}
            />
        }),
        field({
            key: "displayRoleName",
            element: <HookFormInput
                name="displayRoleName"
                label="Display (Role Name)"
                control={control}
                type="text"
                description="The name to display in lieu of the role's name."
            />
        }),
        field({
            key: "creditedAs",
            element: <HookFormInput
                name="creditedAs"
                label="Credited As"
                control={control}
                type="text"
                description="Name in credits."
            />
        }),
    ]

    return (
        <fieldset className={cn("space-y-3", className)}>
            <h3 className="fieldset-header">Basic Details</h3>
            {renderFields({fields})}
        </fieldset>
    );
}