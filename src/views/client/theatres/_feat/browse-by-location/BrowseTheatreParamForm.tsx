/**
 * @file BrowseTheatreParamFormContainer.tsx
 *
 * Container component for the theatre browse parameter form.
 *
 * Responsibilities:
 * - Initializes React Hook Form state
 * - Synchronizes form values with URL search params
 * - Wires submit handling to the presentation layer
 */

import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {useBrowseTheatreParamForm} from "@/domains/theatres/hooks/forms/browse-theatre-params/useBrowseTheatreParamForm.ts";
import {useParsedSearchParams} from "@/common/features/fetch-search-params";
import BrowseTheatreParamFormView from "@/views/client/theatres/_feat/browse-by-location/BrowseTheatreParamFormView.tsx";
import {
    BrowseTheatreParamFormValues,
    BrowseTheatreParams,
    BrowseTheatreParamSchema,
} from "@/domains/theatres/schema/params/client/browse-theatre-list/BrowseTheatreParamSchema.ts";

/**
 * Props for the browse theatre parameter form container.
 */
type FormProps =
    Pick<FormOptions<BrowseTheatreParamFormValues, BrowseTheatreParams>, "presetValues">
    & { className?: string };

/**
 * State-aware container for the browse theatre parameter form.
 */
const BrowseTheatreParamForm = (
    {presetValues, className}: FormProps,
) => {
    const form = useBrowseTheatreParamForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({
        schema: BrowseTheatreParamSchema,
    });

    const updateParams = (values: BrowseTheatreParamFormValues) => {
        setSearchParams(values as BrowseTheatreParams);
    };

    return (
        <BrowseTheatreParamFormView
            form={form}
            submitHandler={updateParams}
            className={className}
        />
    );
};

export default BrowseTheatreParamForm;
