import {FC} from 'react';
import {SubmitHandler, UseFormReturn} from "react-hook-form";
import {RoleTypeQueryOptionsFormValues} from "@/pages/roletype/schema/query-options/RoleTypeQueryOptions.types.ts";
import {Form} from "@/common/components/ui/form.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import RoleTypeDepartmentConstant from "@/pages/roletype/constant/RoleTypeDepartmentConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import HookFormStateToggleButton from "@/common/components/forms/HookFormSortToggle.tsx";
import {cn} from "@/common/lib/utils.ts";
import useDebouncedFormAutoSubmit from "@/common/hooks/forms/useDebouncedFormAutoSubmit.ts";

/**
 * Props for {@link RoleTypeQueryOptionFormView}.
 *
 * @property form - The `react-hook-form` instance controlling form state.
 * @property submitHandler - Callback for form submission, triggered both on manual submit
 * and automatically when form values change.
 */
type FormViewProps = {
    form: UseFormReturn<RoleTypeQueryOptionsFormValues>;
    submitHandler: SubmitHandler<RoleTypeQueryOptionsFormValues>;
}

/**
 * A query option form for filtering and sorting {@link RoleType} entities.
 *
 * @remarks
 * - Provides inputs for role name and department.
 * - Includes toggle buttons for sorting by role name or department.
 * - Automatically submits (debounced by 750ms) whenever values change.
 * - Uses `react-hook-form` for state management and validation.
 *
 * @example
 * ```tsx
 * const form = useForm<RoleTypeQueryOptionsFormValues>({
 *   defaultValues: { roleName: "", department: "" }
 * });
 *
 * const handleSubmit: SubmitHandler<RoleTypeQueryOptionsFormValues> = values => {
 *   console.log("Query options:", values);
 * };
 *
 * <RoleTypeQueryOptionFormView
 *   form={form}
 *   submitHandler={handleSubmit}
 * />
 * ```
 */
const RoleTypeQueryOptionFormView: FC<FormViewProps> = ({form, submitHandler}) => {
    const departmentOptions: ReactSelectOption[] = [
        {value: "", label: "None"},
        ...RoleTypeDepartmentConstant.map(value => ({value, label: convertToTitleCase(value)}))
    ];

    useDebouncedFormAutoSubmit({form, submitHandler, timeout: 450});

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className={cn("p-2 grid grid-cols-1 md:grid-cols-3 md:gap-4")}
            >
                <fieldset className="grid grid-cols-2 gap-4">
                    <HookFormInput
                        name="roleName"
                        label="Role Name"
                        control={form.control}
                    />

                    <HookFormSelect
                        name="department"
                        label="Department"
                        control={form.control}
                        options={departmentOptions}
                    />
                </fieldset>

                <fieldset className="grid grid-cols-2 gap-4">
                    <HookFormStateToggleButton
                        name="sortByRoleName"
                        label="Role Name"
                        control={form.control}
                    />

                    <HookFormStateToggleButton
                        name="sortByDepartment"
                        label="Department"
                        control={form.control}
                    />
                </fieldset>
            </form>
        </Form>
    );
};

export default RoleTypeQueryOptionFormView;
