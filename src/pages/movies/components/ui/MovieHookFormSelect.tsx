import {Control, FieldValues, Path} from "react-hook-form";
import {Loader} from "lucide-react";

import QueryFilters from "@/common/type/QueryFilters.ts";
import ReactSelectOption from "@/common/type/component/ReactSelectOption.ts";

import HookFormSelect from "@/common/components/forms/HookFormSelect.tsx";
import HookFormMultiSelect from "@/common/components/forms/HookFormMultiSelect.tsx";
import useFetchMovies from "@/pages/movies/hooks/queries/useFetchMovies.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";
import {MovieArraySchema} from "@/pages/movies/schema/movie/Movie.schema.ts";

/**
 * Props for the `TheatreHookFormSelect` component.
 *
 * @template TSubmit - Type of the form values used with `react-hook-form`.
 */
interface Props<TSubmit extends FieldValues> {
    /**
     * Name of the form field to register with `react-hook-form`.
     */
    name: Path<TSubmit>;

    /**
     * Label displayed above the select input.
     */
    label: string;

    /**
     * Optional description shown under the label.
     */
    description?: string;

    /**
     * Placeholder text displayed when no option is selected.
     */
    placeholder?: string;

    /**
     * Control object from `react-hook-form`'s `useForm` hook.
     */
    control: Control<TSubmit>;

    /**
     * If true, renders a multi-select instead of a single-select.
     *
     * @default false
     */
    isMulti?: boolean;

    /**
     * Optional filters applied when querying movie options.
     */
    filters?: QueryFilters;
}

/**
 * A reusable form select component for choosing a movie from a list.
 *
 * Internally fetches movie data using `useFetchMovies`, validates the response,
 * and renders either a single or multi-select input using `react-hook-form`.
 *
 * Displays loading and error states appropriately.
 *
 * @template TSubmit - Type of form values managed by `react-hook-form`.
 * @param props - Component props including form control, field name, label, and filters.
 * @returns A form select component populated with validated movie options.
 */
const TheatreHookFormSelect = <TSubmit extends FieldValues>(props: Props<TSubmit>) => {
    const {isMulti = false, filters = {}} = props
    const {data, isPending, isError, error: queryError} = useFetchMovies(filters);
    const {success, error: parseError, data: movies} = useValidateData({
        data,
        isPending,
        schema: MovieArraySchema,
        message: "Invalid Movie Data.",
    });

    if (isPending) return <Loader className="animate-spin"/>;
    if (isError) return <ErrorMessageDisplay error={queryError} />;
    if (!success) return <ErrorMessageDisplay error={parseError} />;

    const options: ReactSelectOption[] = movies.map(
        (movie): ReactSelectOption => ({label: movie.title, value: movie._id}),
    );

    return (
        isMulti
            ? <HookFormMultiSelect<TSubmit> options={options} {...props} />
            : <HookFormSelect<TSubmit> options={options} {...props} />
    );
};

export default TheatreHookFormSelect;
