import {FC} from 'react';
import {Form} from "@/common/components/ui/form.tsx";
import {RoleTypeForm, RoleTypeFormValues} from "@/pages/roletype/schema/submit-form/RoleTypeForm.types.ts";
import {RoleType} from "@/pages/roletype/schema/model/RoleType.types.ts";
import {cn} from "@/common/lib/utils.ts";
import {Button} from "@/common/components/ui/button.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";
import RoleTypeDepartmentConstant from "@/pages/roletype/constant/RoleTypeDepartmentConstant.ts";
import convertToTitleCase from "@/common/utility/convertToTitleCase.ts";
import HookFormTextArea from "@/common/components/forms/HookFormTextArea.tsx";
import {FormViewProps} from "@/common/type/form/HookFormProps.ts";

/**
 * Props for {@link RoleTypeSubmitFormView}.
 *
 * Specializes {@link FormViewProps} for the `RoleType` domain, with its form schema and values.
 *
 * @property className - Optional CSS class for styling the form container.
 */
type SubmitViewProps = FormViewProps<RoleType, RoleTypeForm, RoleTypeFormValues> & {
    className?: string;
}

/**
 * A form component for creating or editing a RoleType entity.
 *
 * Integrates with React Hook Form for form state management and React Query for async mutations.
 * Fields can be dynamically enabled or disabled via the `disableFields` prop.
 *
 * @param props - Props for the form view, including the `form` object from React Hook Form,
 *                the `submitHandler` function, the `mutation` object, and optional UI settings.
 * @returns JSX element rendering a fully controlled form with Role Name, Department, and Description fields.
 *
 * @example
 * ```tsx
 * <RoleTypeSubmitFormView
 *   form={roleTypeForm}
 *   submitHandler={handleRoleTypeSubmit}
 *   mutation={createRoleTypeMutation}
 *   disableFields={['description']}
 *   submitButtonText="Save Role"
 * />
 * ```
 */
const RoleTypeSubmitFormView: FC<SubmitViewProps> = (props) => {
    const { className, form, submitHandler, mutation, disableFields, submitButtonText } = props;
    const { isPending } = mutation;

    /** Determines which fields are active (enabled) based on the disableFields prop */
    const activeFields = {
        roleName: !disableFields?.includes("roleName"),
        department: !disableFields?.includes("department"),
        description: !disableFields?.includes("description"),
    };

    /** Options for the Department select field, converted to Title Case */
    const departmentOptions: ReactSelectOption[] = RoleTypeDepartmentConstant.map((val) => ({
        label: convertToTitleCase(val),
        value: val
    }));

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
                        control={form.control}
                        options={departmentOptions}
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
                    className="w-full bg-primary"
                    disabled={isPending}
                >
                    {submitButtonText ?? "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default RoleTypeSubmitFormView;