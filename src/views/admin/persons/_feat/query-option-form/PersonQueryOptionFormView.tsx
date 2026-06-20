/**
 * @fileoverview Form view for managing person search filters and sorting options.
 */

import {ReactElement} from 'react';
import {PersonQueryOptionFormValues} from "@/domains/persons/_feat/submit-query-options/schema.ts";
import {Separator} from "@/common/components/ui/separator.tsx";
import HookFormInput from "@/common/components/forms/HookFormInput.tsx";
import {CountryHookFormSelect} from "@/common/components/forms/values/CountryHookFormSelect.tsx";
import {cn} from "@/common/lib/utils.ts";
import HookFormSortToggle from "@/common/components/forms/HookFormSortToggle.tsx";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {useFormContext} from "react-hook-form";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {PageSectionHeader} from "@/views/common/_comp/page";

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
                        <CountryHookFormSelect name="nationality" label="Nationality" control={control}/>
                    }
                </div>
            </fieldset>

            <Separator/>

            <fieldset>
                <PageSectionHeader as="h2" text="Sorts"/>

                <div className="flex flex-wrap space-x-3">
                    <HookFormSortToggle name="sortByName" label="Name" control={control}/>
                    <HookFormSortToggle name="sortByDOB" label="Date Of Birth" control={control}/>
                    <HookFormSortToggle name="sortByNationality" label="Nationality" control={control}/>
                </div>
            </fieldset>
        </div>
    );
}