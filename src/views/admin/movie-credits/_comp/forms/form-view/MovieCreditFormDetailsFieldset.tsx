import {ReactElement} from "react";
import {HeaderTextCSS} from "@/common/constants/css/TextCSS.ts";
import {RoleTypeDepartmentRadioGroup} from "@/domains/roletype/components/inputs/RoleTypeDepartmentRadioGroup.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {MovieCreditFormDisableFields} from "@/domains/moviecredit/_feat/submit-data";
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/lib/utils.ts";
import {HookFormField} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {renderFields} from "@/common/features/submit-data";

type FieldsetProps = {
    className?: string;
    disableFields?: MovieCreditFormDisableFields;
};

export function MovieCreditFormDetailsFieldset(
    {className, disableFields}: FieldsetProps
): ReactElement {
    const {control} = useFormContext();

    const fields: HookFormField[] = [
        {
            render: !disableFields?.department,
            key: "department",
            element: <RoleTypeDepartmentRadioGroup
                control={control}
                name="department"
                label="Department"
                className="flex flex-row justify-start space-x-5"
            />
        },
        {
            render: !disableFields?.person,
            key: "person",
            element: <HookFormSelect
                name="person"
                label="Person"
                control={control}
                options={[]}
            />
        },
        {
            render: !disableFields?.roleType,
            key: "roleType",
            element: <HookFormSelect
                name="roleType"
                label="Role Type"
                control={control}
                options={[]}
            />
        },
        {
            render: !disableFields?.displayRoleName,
            key: "displayRoleName",
            element: <HookFormInput
                name="displayRoleName"
                label="Display (Role Name)"
                control={control}
                type="text"
                description="The name to display in lieu of the role's name."
            />
        },
        {
            render: !disableFields?.creditedAs,
            key: "creditedAs",
            element: <HookFormInput
                name="creditedAs"
                label="Credited As"
                control={control}
                type="text"
                description="Name in credits."
            />
        },
    ]

    return (
        <fieldset className={cn("space-y-3", className)}>
            <h1 className={HeaderTextCSS}>Basic Details</h1>
            {renderFields({fields})}
        </fieldset>
    );
}