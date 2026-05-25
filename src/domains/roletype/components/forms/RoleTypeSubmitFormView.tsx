/**
 * @fileoverview Form view component for creating and updating RoleType entities.
 */

import {ReactElement} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {RoleTypeForm, RoleTypeFormValues} from "@/domains/roletype/schema/submit-form/RoleTypeForm.types.ts";
import {RoleType} from "@/domains/roletype/schema/model/RoleType.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {HookFormSelect} from "@/views/common/_comp/form-select/HookFormSelect.tsx";
import {ReactSelectOption} from "@/common/type/input/ReactSelectOption.ts";
import RoleTypeDepartmentConstant from "@/domains/roletype/constant/RoleTypeDepartmentConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";
import {
    RoleTypeCategorySelect
} from "@/domains/roletype/components/inputs/RoleTypeCategorySelect.tsx";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {PrimaryButtonCSS} from "@/common/constants/css/ButtonCSS.ts";

/** Props for the RoleTypeSubmitFormView component. */
type SubmitViewProps = FormViewProps<RoleType, RoleTypeForm, RoleTypeFormValues> & {
    className?: string;
}

/**
 * A form component for creating or editing a RoleType entity.
 */
export function RoleTypeSubmitFormView(
    {className, form, submitHandler, mutation, disableFields, submitButtonText}: SubmitViewProps
): ReactElement {
    const {isPending} = mutation;

    const activeFields = {
        roleName: !disableFields?.includes("roleName"),
        department: !disableFields?.includes("department"),
        description: !disableFields?.includes("description"),
        category: !disableFields?.includes("category"),
    };

    const departmentOptions: ReactSelectOption[] = RoleTypeDepartmentConstant.map((val) => ({
        label: convertToTitleCase(val),
        value: val
    }));

    const department = form.watch("department") as (RoleTypeDepartment | undefined);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className={cn('space-y-5', className)}>

                {activeFields["roleName"] && (
                    <HookFormInput
                        name="roleName"
                        label="Role Name"
                        control={form.control}
                    />
                )}

                {activeFields["department"] && (
                    <HookFormSelect
                        name="department"
                        label="Department"
                        options={departmentOptions}
                    />
                )}

                {activeFields["category"] && (
                    <RoleTypeCategorySelect
                        department={department}
                        name="category"
                        label="Category"
                        control={form.control}
                    />
                )}

                {activeFields["description"] && (
                    <HookFormTextArea
                        name="description"
                        label="Description"
                        control={form.control}
                    />
                )}

                <Button
                    variant="default"
                    className={cn(PrimaryButtonCSS, "w-full")}
                    disabled={isPending}
                >
                    {submitButtonText ?? "Submit"}
                </Button>
            </form>
        </Form>
    );
}
