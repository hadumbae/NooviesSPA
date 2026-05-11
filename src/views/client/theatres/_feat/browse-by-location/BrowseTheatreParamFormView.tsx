/**
 * @fileoverview Form view for browsing theatres by location parameters.
 */
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {ReactElement} from "react";
import {useBaseFormContext} from "@/common/features/generic-form-context";
import {useAutoFormSubmit} from "@/common/features/submit-data";
import {useFormContext} from "react-hook-form";

/** Props for the BrowseTheatreParamFormView component. */
type FormProps = {
    className?: string;
};

/**
 * Input field for location-based theatre searches.
 */
export function BrowseTheatreParamFormView({className}: FormProps): ReactElement {
    const {control} = useFormContext();
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) {
        throw new Error("`BrowseTheatreParamFormView` requires a submitHandler");
    }

    useAutoFormSubmit({submitHandler})

    return (
        <div className={className}>
            <HookFormInput
                name="target"
                label="Location"
                placeholder="City, State, or Post Code"
                control={control}
            />
        </div>
    );
}
