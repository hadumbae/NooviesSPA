/**
 * @file ShowingStatusHookFormSelect.tsx
 * @description
 * A reusable React Hook Form select component specifically for selecting a showing status.
 * This component maps all statuses from `ShowingStatusConstant` to a `ReactSelectOption[]` and
 * renders a `HookFormSelect` with those options. It ensures the select is properly typed for
 * the `ShowingFormValues` form schema by default, while allowing generic form value types.
 *
 * @module ShowingStatusHookFormSelect
 */

import HookFormSelect, {SelectProps} from "@/common/components/forms/select/HookFormSelect.tsx";
import {FieldValues} from "react-hook-form";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import ShowingStatusConstant from "@/pages/showings/constants/ShowingStatusConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import {ShowingFormValues} from "@/pages/showings/schema/form/ShowingFormValues.types.ts";

/**
 * Props for `ShowingStatusHookFormSelect`.
 *
 * Extends `SelectProps` from `HookFormSelect`, but removes the `options` prop
 * to enforce the component’s internal use of `ShowingStatusConstant`.
 *
 * @template TValues - The form values type, defaults to `ShowingFormValues`.
 */
type StatusProps<TValues extends FieldValues> = Omit<SelectProps<TValues>, "options"> & {
    /** `options` is never allowed; this component generates options automatically. */
    options?: never;
};

/**
 * A Hook Form select component for showing statuses.
 *
 * This component automatically generates the `options` from `ShowingStatusConstant`,
 * converting each status to title case with spaces for display.
 *
 * @template TValues - The form values type, defaults to `ShowingFormValues`.
 * @param {StatusProps<TValues>} props - Props to pass to the underlying `HookFormSelect`.
 * @returns {JSX.Element} A `HookFormSelect` component with predefined showing status options.
 *
 * @example
 * ```tsx
 * <ShowingStatusHookFormSelect
 *   name="status"
 *   control={control}
 *   placeholder="Select a showing status"
 * />
 * ```
 */
const ShowingStatusHookFormSelect = <TValues extends FieldValues = ShowingFormValues>(
    props: StatusProps<TValues>
) => {
    const options: ReactSelectOption[] = ShowingStatusConstant.map(
        status => {
            const formattedStatus = convertToTitleCase(status.replace("_", " "));
            return { label: formattedStatus, value: status };
        }
    );

    return <HookFormSelect {...props} options={options} />;
};

export default ShowingStatusHookFormSelect;
