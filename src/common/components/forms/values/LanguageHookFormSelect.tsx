/**
 * @file LanguageHookFormSelect.tsx
 * @description
 * A reusable language selector integrated with React Hook Form.
 * Supports single-select and multi-select modes using ISO 639-1 language codes.
 *
 * Works with generic form types (`TValues extends FieldValues`) from `react-hook-form`.
 *
 * @example
 * // Single select
 * <LanguageHookFormSelect
 *    name="preferredLanguage"
 *    label="Preferred Language"
 *    control={control}
 * />
 *
 * // Multi-select
 * <LanguageHookFormSelect
 *    name="knownLanguages"
 *    label="Known Languages"
 *    control={control}
 *    isMulti
 * />
 */

import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import ISO6391CodeConstant from "@/common/constants/languages/ISO6391CodeConstant.ts";
import {FieldValues} from "react-hook-form";
import {HookFormInputControlProps} from "@/common/type/input/HookFormInputProps.ts";

/**
 * Props for the {@link LanguageHookFormSelect} component.
 *
 * @template TValues - The type of the form values from `react-hook-form`.
 */
type HookSelectProps<TValues extends FieldValues> = HookFormInputControlProps<TValues> & {
    /** Whether the select should allow multiple selections */
    isMulti?: boolean;
};

/**
 * `LanguageHookFormSelect` provides a type-safe language selection input integrated with React Hook Form.
 *
 * Features:
 * - Supports both single-select and multi-select modes
 * - Uses ISO 639-1 language codes for options
 * - Works with generic form types (`TValues extends FieldValues`)
 *
 * @template TValues - The type of the form values.
 *
 * @param {HookSelectProps<TValues>} props - Props to configure the language select input.
 * @returns {JSX.Element} A form-connected language select input.
 */
const LanguageHookFormSelect = <TValues extends FieldValues>(
    props: HookSelectProps<TValues>
) => {
    const {isMulti = false, ...rest} = props;

    const options = ISO6391CodeConstant.map((code): ReactSelectOption => ({
        value: code,
        label: ISO6391LanguageConstant[code]
    }));

    return (
        isMulti
            ? <HookFormMultiSelect options={options} {...rest} />
            : <HookFormSelect options={options} {...rest} />
    );
};

export default LanguageHookFormSelect;
