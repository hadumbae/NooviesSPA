import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import HookFormRadioGroup from "@/common/components/forms/HookFormRadioGroup.tsx";
import RoleTypeDepartmentConstant from "@/pages/roletype/constant/RoleTypeDepartmentConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";

/**
 * Props for the `RoleTypeDepartmentRadioGroup` component.
 *
 * @template TForm - The type of the form data object used with react-hook-form.
 */
export type RoleTypeProps<TForm extends FieldValues> = {
    /** The `react-hook-form` object returned by `useForm`. */
    form: UseFormReturn<TForm>;

    /** The name of the field in the form this radio group controls. */
    name: Path<TForm>;

    /** The label displayed above the radio group. */
    label: string;

    /** Optional CSS class name applied to the radio group container. */
    className?: string;
};

/**
 * A radio group component for selecting a department in a role type form.
 *
 * This component automatically generates options from the
 * `RoleTypeDepartmentConstant` list, formatting each value
 * to title case for display. It integrates with `react-hook-form`
 * through `HookFormRadioGroup`.
 *
 * @template TForm - The type of the form data object used with react-hook-form.
 * @param {RoleTypeProps<TForm>} props - The props for the component.
 * @returns A `HookFormRadioGroup` configured for selecting a role type department.
 *
 * @example
 * ```tsx
 * const form = useForm<{ department: string }>();
 * <RoleTypeDepartmentRadioGroup
 *     form={form}
 *     name="department"
 *     label="Select Department"
 * />
 * ```
 */
const RoleTypeDepartmentRadioGroup = <TForm extends FieldValues>(
    props: RoleTypeProps<TForm>
) => {
    const { form, name, label, className } = props;

    const items: HookRadioOption[] = RoleTypeDepartmentConstant.map(
        val => ({ label: convertToTitleCase(val), value: val })
    );

    return (
        <HookFormRadioGroup
            className={className}
            form={form}
            label={label}
            name={name}
            items={items}
        />
    );
};

export default RoleTypeDepartmentRadioGroup;
