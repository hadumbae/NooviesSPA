import {Control, FieldValues, Path} from "react-hook-form";
import RequestQueryFilters from "@/common/type/request/RequestQueryFilters.ts";
import {Loader} from "lucide-react";
import HookFormMultiSelect from "@/common/components/forms/select/HookFormMultiSelect.tsx";
import HookFormSelect from "@/common/components/forms/select/HookFormSelect.tsx";
import ReactSelectOption from "@/common/type/input/ReactSelectOption.ts";
import useFetchTheatres from "@/pages/theatres/hooks/query/useFetchTheatres.ts";
import {TheatreArraySchema} from "@/pages/theatres/schema/theatre/Theatre.schema.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {TheatreArray} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

/**
 * Props for {@link TheatreHookFormSelect}.
 *
 * @template TSubmit - The form's field value type managed by React Hook Form.
 */
type SelectProps<TSubmit extends FieldValues> = {
    /** Field name as registered in the form schema. */
    name: Path<TSubmit>;

    /** Label text displayed for the select input. */
    label: string;

    /** Optional helper text or description shown below the label. */
    description?: string;

    /** Placeholder text displayed when no value is selected. */
    placeholder?: string;

    /** React Hook Form control instance for field registration. */
    control: Control<TSubmit>;

    /** Enables multiple selection when `true`. Defaults to `false`. */
    isMulti?: boolean;

    /** Disables the input when `true`. */
    isDisabled?: boolean;

    /** Optional query filters passed to theatre fetching hook. */
    filters?: RequestQueryFilters;
};

/**
 * A form select component that dynamically fetches and validates theatre options.
 *
 * @remarks
 * This component integrates React Hook Form with server-fetched data using React Query.
 * It supports both single and multiple selection modes, handles loading and error states,
 * and validates fetched data against `TheatreArraySchema`.
 *
 * @typeParam TSubmit - The form field type handled by React Hook Form.
 *
 * @example
 * ```tsx
 * const form = useForm<ShowingFormValues>();
 *
 * <TheatreHookFormSelect
 *   name="theatreId"
 *   label="Select Theatre"
 *   placeholder="Choose a theatre..."
 *   control={form.control}
 *   filters={{ isActive: true }}
 * />
 * ```
 */
const TheatreHookFormSelect = <TSubmit extends FieldValues>(
    props: SelectProps<TSubmit>
) => {
    const {isDisabled, isMulti = false, filters = {}} = props;

    const query = useFetchTheatres(filters);

    return (
        <QueryBoundary
            query={query}
            loaderComponent={Loader}
            errorComponent={ErrorMessageDisplay}
        >
            <ValidatedQueryBoundary
                query={query}
                schema={TheatreArraySchema}
                message="Invalid Theatre Data."
                loaderComponent={Loader}
                errorComponent={ErrorMessageDisplay}
            >
                {(theatres: TheatreArray) => {
                    const options: ReactSelectOption[] = theatres.map(
                        (theatre): ReactSelectOption => ({
                            label: theatre.name,
                            value: theatre._id,
                        }),
                    );

                    return isMulti ? (
                        <HookFormMultiSelect<TSubmit>
                            isDisabled={isDisabled}
                            options={options}
                            {...props}
                        />
                    ) : (
                        <HookFormSelect<TSubmit>
                            isDisabled={isDisabled}
                            options={options}
                            {...props}
                        />
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default TheatreHookFormSelect;
