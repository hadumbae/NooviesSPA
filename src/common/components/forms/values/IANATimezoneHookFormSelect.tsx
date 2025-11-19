/**
 * @file IANATimezoneHookFormSelect.tsx
 * @description
 * A reusable IANA timezone selector integrated with React Hook Form.
 * Supports single-select and multi-select modes using the `@vvo/tzdb` library.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * // Single select
 * <IANATimezoneHookFormSelect
 *    name="timezone"
 *    label="Timezone"
 *    control={control}
 * />
 *
 * // Multi-select
 * <IANATimezoneHookFormSelect
 *    name="preferredTimezones"
 *    label="Preferred Timezones"
 *    control={control}
 *    isMulti
 * />
 */

import {FieldValues} from "react-hook-form";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import {getTimeZones} from "@vvo/tzdb";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Props for the {@link IANATimezoneHookFormSelect} component.
 *
 * @template TValues - The type of the form values from `react-hook-form`.
 */
type FormSelectProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    /** Whether the select should allow multiple selections */
    isMulti?: boolean;
};

/**
 * `IANATimezoneHookFormSelect` provides a type-safe timezone selection input integrated with React Hook Form.
 *
 * Features:
 * - Supports both single-select and multi-select modes
 * - Uses IANA timezones from `@vvo/tzdb`
 * - Works with generic form types (`TValues extends FieldValues`)
 *
 * @template TValues - The type of the form values.
 *
 * @param {FormSelectProps<TValues>} props - Props to configure the timezone select input.
 * @returns {JSX.Element} A form-connected timezone select input.
 */
const IANATimezoneHookFormSelect = <TValues extends FieldValues>(
    props: FormSelectProps<TValues>
): JSX.Element => {
    const {isMulti} = props;
    const timeZones = getTimeZones();

    const options: ReactSelectOption[] = timeZones.map(
        ({name, alternativeName, mainCities}) => ({
            value: name,
            label: `${alternativeName} (${mainCities[0]})`,
        })
    );

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...props} />
            : <HookFormSelect options={options} {...props} />
    );
};

export default IANATimezoneHookFormSelect;
