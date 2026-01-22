/**
 * @file TheatreShowingQueryFormContainer.tsx
 *
 * Container component for the Theatre Showing query form.
 *
 * Responsibilities:
 * - Initializes the React Hook Form instance
 * - Syncs validated form values with URL search parameters
 * - Passes configuration and handlers to the presentational view
 *
 * This component contains no UI logic and acts purely as a data
 * and state orchestration layer.
 */

import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {
    TheatreShowingQueryOptionSchema
} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.schema.ts";
import {TheatreShowingQueryFormValues, TheatreShowingQueryOptions} from "@/pages/showings/schema/features/movie-showings/TheatreShowingQueryOptions.types.ts";
import {useTheatreShowingQueryForm} from "@/pages/showings/hooks/forms/theatre-showing-query-form/useTheatreShowingQueryForm.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import TheatreShowingQueryFormView
    from "@/pages/showings/components/forms/theatre-showing-query/TheatreShowingQueryFormView.tsx";

/**
 * Props for {@link TheatreShowingQueryFormContainer}.
 *
 * Inherits:
 * - `disableFields` to conditionally disable form inputs
 * - `presetValues` to initialize query state
 */
type FormParams = Pick<
    FormOptions<TheatreShowingQueryFormValues, TheatreShowingQueryOptions>,
    "disableFields" | "presetValues"
>;

/**
 * Container component that binds the Theatre Showing query form
 * to URL search parameters.
 */
const TheatreShowingQueryFormContainer = ({disableFields, presetValues}: FormParams) => {
    const form = useTheatreShowingQueryForm({presetValues});

    const {setSearchParams} = useParsedSearchParams({
        schema: TheatreShowingQueryOptionSchema,
    });

    /**
     * Update URL search parameters when the form submits.
     */
    const updateParams = (values: TheatreShowingQueryFormValues) => {
        setSearchParams(values as TheatreShowingQueryOptions);
    };

    return (
        <TheatreShowingQueryFormView
            form={form}
            submitHandler={updateParams}
            disableFields={disableFields}
        />
    );
};

export default TheatreShowingQueryFormContainer;
