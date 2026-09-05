/**
 * @fileoverview View component for filtering and sorting the persons list.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {cn, QueryOptionFormViewProps, useQueryOptionFormContext} from "@/common/_feat";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {HookFormInput, HookFormSortToggle} from "@/views/common/_feat";
import {Button} from "@/views/common/_comp/ui";
import {X} from "lucide-react";
import {LabelledFormInput} from "@/views/admin/movies";
import {
    BrowsePersonsQueryOptionFormValues
} from "@/domains/persons/_feat/client-view-data/browse-persons/form/BrowsePersonsQueryOptionFormValues.ts";

/**
 * Form section for filtering and sorting persons.
 */
export function BrowsePersonsQueryOptionsFormView(
    {classNames, disableFields, hideFields}: QueryOptionFormViewProps<BrowsePersonsQueryOptionFormValues>
): ReactElement {
    const {control, watch, reset} = useFormContext();
    const {submitHandler} = useQueryOptionFormContext();

    useAutoFormSubmit({submitHandler, timeout: 450});

    const values = watch();
    const hasValues = Object.entries(values).filter(([_, value]) => value).length > 0;

    const clearFilters = () => reset({name: "", sortByName: ""});

    return (
        <div className={cn(
            "flex max-md:flex-col max-md:space-y-2 md:items-center md:space-x-5",
            classNames?.container,
        )}>
            {!hideFields?.name && (
                <LabelledFormInput label="Name" classNames={{container: classNames?.filters}}>
                    <HookFormInput name="name" placeholder="Name" control={control} disabled={disableFields?.name}/>
                </LabelledFormInput>
            )}

            {!hideFields?.sortByName && (
                <div className={classNames?.sorts}>
                    <HookFormSortToggle label="Sort By Name" name="sortByName" disabled={disableFields?.sortByName}/>
                </div>
            )}


            {hasValues && (
                <Button variant="secondary" onClick={clearFilters}>
                    <X/>
                </Button>
            )}
        </div>
    );
}