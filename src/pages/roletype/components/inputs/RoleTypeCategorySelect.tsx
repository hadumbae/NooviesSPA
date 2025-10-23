import RoleTypeCrewCategoryConstant from "@/pages/roletype/constant/RoleTypeCrewCategoryConstant.ts";
import RoleTypeCastCategoryConstant from "@/pages/roletype/constant/RoleTypeCastCategoryConstant.ts";
import { RoleTypeDepartment } from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import { Control, FieldValues, Path } from "react-hook-form";
import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";

/**
 * Props for {@link RoleTypeCategorySelect}.
 *
 * @template TSubmit - The type of form values (extends `FieldValues` from React Hook Form).
 */
type SelectProps<TSubmit extends FieldValues> = {
    /** Whether multiple categories can be selected. Defaults to `false`. */
    isMulti?: boolean;

    /**
     * The role's department, determining available categories.
     *
     * @remarks
     * - `"CAST"` → Uses `RoleTypeCastCategoryConstant`.
     * - `"CREW"` → Uses `RoleTypeCrewCategoryConstant`.
     * - `undefined` or `null` → No options will be shown.
     */
    department: RoleTypeDepartment | undefined | null;

    /** The name of the controlled field (from React Hook Form). */
    name: Path<TSubmit>;

    /** The label displayed for the select field. */
    label: string;

    /** React Hook Form `control` instance used to register the field. */
    control: Control<TSubmit>;
};

/**
 * A reusable **form select component** for choosing role type categories
 * (cast or crew) depending on the selected department.
 *
 * @remarks
 * - Renders as a single-select (`HookFormSelect`) or multi-select (`HookFormMultiSelect`).
 * - Maps predefined constants to `<option>` labels and values.
 * - When no department is selected, the list will be empty.
 *
 * @template TSubmit - The React Hook Form data type.
 *
 * @example
 * ```tsx
 * <RoleTypeCategorySelect
 *   name="categories"
 *   label="Select Role Categories"
 *   department="CREW"
 *   control={form.control}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <RoleTypeCategorySelect
 *   name="categories"
 *   label="Select Cast Categories"
 *   department="CAST"
 *   isMulti
 *   control={form.control}
 * />
 * ```
 */
const RoleTypeCategorySelect = <TSubmit extends FieldValues>(props: SelectProps<TSubmit>) => {
    const { department, isMulti = false, ...formProps } = props;

    // Select appropriate constant set based on department
    const values =
        department === "CAST"
            ? RoleTypeCastCategoryConstant
            : department === "CREW"
                ? RoleTypeCrewCategoryConstant
                : [];

    // Convert to react-select options
    const options: ReactSelectOption[] = values.map(value => ({ value, label: value }));

    // Render component type based on `isMulti`
    return isMulti
        ? <HookFormMultiSelect options={options} {...formProps} />
        : <HookFormSelect options={options} {...formProps} />;
};

export default RoleTypeCategorySelect;
