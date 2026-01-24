import {
    BrowseTheatreParamFormValues,
    BrowseTheatreParams,
    BrowseTheatreParamsSchema
} from "@/pages/movies/schema/params/BrowseTheatreParams.ts";
import {FormOptions} from "@/common/type/form/HookFormProps.ts";
import {
    useBrowseTheatreParamForm
} from "@/pages/theatres/hooks/forms/browse-theatre-params/useBrowseTheatreParamForm.ts";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import BrowseTheatreParamFormView from "@/pages/theatres/components/admin/form/client/BrowseTheatreParamFormView.tsx";

type FormProps = Pick<
    FormOptions<BrowseTheatreParamFormValues, BrowseTheatreParams>,
    "presetValues" | "disableFields"
> & { className?: string };

const BrowseTheatreParamFormContainer = (
    {presetValues, disableFields, className}: FormProps
) => {
    const form = useBrowseTheatreParamForm({presetValues});
    const {setSearchParams} = useParsedSearchParams({schema: BrowseTheatreParamsSchema});

    const updateParams = (values: BrowseTheatreParamFormValues) => {
        setSearchParams(values as BrowseTheatreParams);
    }

    return (
        <BrowseTheatreParamFormView
            form={form}
            submitHandler={updateParams}
            disableFields={disableFields}
            className={className}
        />
    );
};

export default BrowseTheatreParamFormContainer;
