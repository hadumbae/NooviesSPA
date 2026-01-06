import {Control, FieldValues, Path} from "react-hook-form";
import RequestQueryParams from "@/common/type/request/RequestQueryParams.ts";
import {Loader} from "lucide-react";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import {ScreenArraySchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import useFetchScreens from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreens.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {ScreenArray} from "@/pages/screens/schema/screen/Screen.types.ts";

/**
 * Props for `ScreenHookFormSelect` component.
 *
 * @template TSubmit - The type of the form values managed by `react-hook-form`.
 */
type SelectProps<TSubmit extends FieldValues> = {
    /** Name of the form field to register with `react-hook-form`. */
    name: Path<TSubmit>;

    /** Label displayed above the select input. */
    label: string;

    /** Optional description shown under the label. */
    description?: string;

    /** Placeholder text displayed when no option is selected. */
    placeholder?: string;

    /** `react-hook-form` control object for this field. */
    control: Control<TSubmit>;

    /** If true, renders a multi-select input instead of a single-select. Defaults to `false`. */
    isMulti?: boolean;

    /** Optional filters applied when querying screen options. */
    filters?: RequestQueryParams;
}

/**
 * A reusable form select component for choosing one or multiple screens.
 *
 * Fetches screen data using `useFetchScreens`, validates the response using `ScreenArraySchema`,
 * and renders a single-select or multi-select input connected to `react-hook-form`.
 *
 * Automatically handles loading and error states via `QueryBoundary` and `ValidatedQueryBoundary`.
 *
 * @template TSubmit - The type of form values managed by `react-hook-form`.
 * @param props - Component props including `control`, `name`, `label`, `filters`, and `isMulti`.
 * @returns A form select input populated with validated screen options.
 *
 * @example
 * ```ts
 * <ScreenHookFormSelect
 *   name="mainScreen"
 *   label="Select Main Screen"
 *   control={form.control}
 *   placeholder="Choose a screen"
 * />
 *
 * <ScreenHookFormSelect
 *   name="screens"
 *   label="Select Screens"
 *   control={form.control}
 *   isMulti
 * />
 * ```
 */
const ScreenHookFormSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
) => {
    const {isMulti = false, filters = {}} = props;
    const query = useFetchScreens({queries: filters});

    return (
        <QueryBoundary query={query} loaderComponent={Loader} errorComponent={ErrorMessageDisplay}>
            <ValidatedQueryBoundary query={query} schema={ScreenArraySchema} loaderComponent={Loader} errorComponent={ErrorMessageDisplay}>
                {(screens: ScreenArray) => {
                    const options: ReactSelectOption[] = screens.map(
                        ({_id, name, screenType}): ReactSelectOption => ({value: _id, label: `${name} (${screenType})`}),
                    );

                    return (
                        isMulti
                            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
                            : <HookFormSelect<TSubmit> options={options} {...props} />
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default ScreenHookFormSelect;
