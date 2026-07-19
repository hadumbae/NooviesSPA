/**
 * @fileoverview Form view for managing person search filters and sorting options.
 */

import {ReactElement} from 'react';
import {useFormContext} from "react-hook-form";
import {cn} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui";
import {HookFormInput, HookFormSortToggle} from "@/views/common/_feat";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {PageSectionHeader} from "@/views/common/_comp/page";
import {PersonQueryOptionFormValues} from "@/domains/persons";
import {HookFormSelect} from "@/views/common/_comp";
import {ISO3166Alpha2CountryOptions} from "@/common/_const";

/** Props for the PersonQueryOptionFormView component. */
type ViewProps = FormViewProps<PersonQueryOptionFormValues>;

/**
 * Form component for filtering and sorting person entities with debounced auto-submission.
 */
export function PersonQueryOptionFormView(
    {disableFields, className}: ViewProps
): ReactElement {
    const {control} = useFormContext();
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) {
        throw new Error(`'${PersonQueryOptionFormView.name}' requires a 'submitHandler'.`);
    }

    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", className)}>
            <fieldset>
                <PageSectionHeader as="h2" text="Filters"/>

                <div className="grid grid-cols-1 gap-2">
                    {
                        !disableFields?.name &&
                        <HookFormInput name="name" label="Name" control={control}/>
                    }

                    {
                        !disableFields?.dob &&
                        <HookFormInput name="dob" label="Date Of Birth" type="date" control={control}/>
                    }

                    {
                        !disableFields?.nationality &&
                        <HookFormSelect name="nationality" label="Nationality" options={ISO3166Alpha2CountryOptions}/>
                    }
                </div>
            </fieldset>

            <Separator/>

            <fieldset>
                <PageSectionHeader as="h2" text="Sorts"/>

                <div className="flex flex-wrap space-x-3">
                    <HookFormSortToggle name="sortByName" label="Name"/>
                    <HookFormSortToggle name="sortByDOB" label="Date Of Birth"/>
                    <HookFormSortToggle name="sortByNationality" label="Nationality"/>
                </div>
            </fieldset>
        </div>
    );
}