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

import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import {useTheatreShowingQueryForm} from "@/domains/showings/hooks/forms/theatre-showing-query-form/useTheatreShowingQueryForm.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import TheatreShowingQueryFormView
    from "@/domains/showings/components/forms/theatre-showing-query/TheatreShowingQueryFormView.tsx";
import {
    ShowingsPageQueryFormStarterValues,
    ShowingsPageQueryStrings,
    ShowingsPageQueryStringSchema
} from "@/domains/movies/_feat/client-view-data";

/**
 * Props for {@link TheatreShowingQueryFormContainer}.
 *
 * Inherits:
 * - `disableFields` to conditionally disable form inputs
 * - `presetValues` to initialize query state
 */
type FormParams = Pick<
    FormOptions<ShowingsPageQueryFormStarterValues, ShowingsPageQueryStrings>,
    "disableFields" | "presetValues"
>;

/**
 * Container component that binds the Theatre Showing query form
 * to URL search parameters.
 */
const TheatreShowingQueryFormContainer = ({disableFields, presetValues}: FormParams) => {
    const form = useTheatreShowingQueryForm({presetValues});

    const {setSearchParams} = useParsedSearchParams({
        schema: ShowingsPageQueryStringSchema,
    });

    /**
     * Update URL search parameters when the form submits.
     */
    const updateParams = (values: ShowingsPageQueryFormStarterValues) => {
        setSearchParams(values as ShowingsPageQueryStrings);
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
