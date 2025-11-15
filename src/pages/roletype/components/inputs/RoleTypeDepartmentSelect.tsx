import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {Control, FieldValues, Path} from "react-hook-form";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import RoleTypeDepartmentConstant from "@/pages/roletype/constant/RoleTypeDepartmentConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";

/**
 * Props for {@link RoleTypeDepartmentSelect}.
 *
 * @template TSubmit - The type of the form values object used by `react-hook-form`.
 * @property name - The field name in the form corresponding to this select input.
 * @property label - The label to display above the select input.
 * @property control - The `react-hook-form` control object to manage form state.
 */
type SelectProps<TSubmit extends FieldValues> = {
    name: Path<TSubmit>;
    label: string;
    control: Control<TSubmit>;
};

/**
 * **RoleTypeDepartmentSelect**
 *
 * A form select input for choosing a role type department.
 *
 * Features:
 * - Uses `react-hook-form` for state management and validation.
 * - Populates options from {@link RoleTypeDepartmentConstant}.
 * - Automatically converts constant values to title case for display.
 *
 * @template TSubmit - The type of the form values object for this select.
 *
 * @param props - Props including `name`, `label`, and `control` from `react-hook-form`.
 *
 * @example
 * ```tsx
 * <RoleTypeDepartmentSelect<MyFormValues>
 *   name="department"
 *   label="Department"
 *   control={form.control}
 * />
 * ```
 *
 * @returns JSX element rendering a controlled select input for role type departments.
 */
const RoleTypeDepartmentSelect = <TSubmit extends FieldValues>(props: SelectProps<TSubmit>) => {
    const options: ReactSelectOption[] = RoleTypeDepartmentConstant.map(
        value => ({value, label: convertToTitleCase(value)})
    );

    return (
        <HookFormSelect options={options} {...props} />
    );
};

export default RoleTypeDepartmentSelect;
