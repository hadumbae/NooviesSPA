import {FC} from 'react';
import {RoleTypeQueryOptionsFormValues} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import HookFormStateToggleButton from "@/common/components/forms/HookFormSortToggle.tsx";
import {cn} from "@/common/lib/utils.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";
import {SearchParamFormViewProps} from "@/common/type/form/SearchParamFormProps.ts";
import getActiveSchemaInputFields from "@/common/utility/forms/getActiveSchemaInputFields.ts";
import {
    RoleTypeQueryOptionsFormValuesSchema
} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.schema.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import RoleTypeDepartmentSelect from "@/pages/roletype/components/inputs/RoleTypeDepartmentSelect.tsx";

/**
 * Props for {@link RoleTypeQueryOptionFormView}.
 *
 * @property form - `react-hook-form` object managing the query options form state.
 * @property submitHandler - Function called when the form is submitted.
 * @property disableFields - Optional array of field names to hide or disable in the form.
 * @property className - Optional CSS classes applied to the main form container.
 */
type FormViewProps = SearchParamFormViewProps<RoleTypeQueryOptionsFormValues>;

/**
 * **RoleTypeQueryOptionFormView**
 *
 * Form component for filtering and sorting Role Types.
 *
 * Features:
 * - Integrates with `react-hook-form` for state management and validation.
 * - Automatically debounces form submissions via {@link useDebouncedFormAutoSubmit}.
 * - Dynamically hides or disables fields based on `disableFields`.
 * - Provides filter inputs for Role Name and Department.
 * - Provides sort toggle buttons for Role Name and Department.
 *
 * @param props - Props including `form`, `submitHandler`, `disableFields`, and `className`.
 *
 * @example
 * ```tsx
 * import useForm from "react-hook-form";
 * import RoleTypeQueryOptionFormView from "@/pages/roletype/components/forms/RoleTypeQueryOptionFormView.tsx";
 *
 * const form = useForm<RoleTypeQueryOptionsFormValues>({
 *   defaultValues: { roleName: "", department: "", sortByRoleName: null, sortByDepartment: null }
 * });
 *
 * <RoleTypeQueryOptionFormView
 *   form={form}
 *   submitHandler={(values) => console.log("Submitted values:", values)}
 *   disableFields={["sortByDepartment"]}
 *   className="max-w-md"
 * />
 * ```
 *
 * @returns JSX element rendering a controlled form for filtering and sorting Role Types.
 */
const RoleTypeQueryOptionFormView: FC<FormViewProps> = (props) => {
    const {form, submitHandler, disableFields, className} = props;

    useDebouncedFormAutoSubmit({form, submitHandler, timeout: 450});

    const activeFields = getActiveSchemaInputFields({
        schema: RoleTypeQueryOptionsFormValuesSchema,
        disableFields,
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("p-2 space-y-4", className)}
            >
                <fieldset className="space-y-3">
                    <div>
                        <h1 className="text-lg font-bold">Filters</h1>
                        <Separator/>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {
                            activeFields["roleName"] &&
                            <HookFormInput
                                name="roleName"
                                label="Role Name"
                                control={form.control}
                            />
                        }

                        {
                            activeFields["department"] &&
                            <RoleTypeDepartmentSelect
                                name="department"
                                label="Department"
                                control={form.control}
                            />
                        }
                    </div>
                </fieldset>

                <fieldset className="space-y-3">
                    <div>
                        <h1 className="text-lg font-bold">Sort</h1>
                        <Separator/>
                    </div>

                    <div className="flex flex-wrap items-center space-x-3">
                        {
                            activeFields["sortByRoleName"] &&
                            <HookFormStateToggleButton
                                name="sortByRoleName"
                                label="Role Name"
                                control={form.control}
                            />
                        }

                        {
                            activeFields["sortByDepartment"] &&
                            <HookFormStateToggleButton
                                name="sortByDepartment"
                                label="Department"
                                control={form.control}
                            />
                        }
                    </div>
                </fieldset>
            </form>
        </Form>
    );
};

export default RoleTypeQueryOptionFormView;
