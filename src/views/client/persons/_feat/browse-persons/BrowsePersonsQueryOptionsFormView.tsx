/**
 * @fileoverview View component for filtering and sorting the persons list.
 */

import {ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {cn} from "@/common/_feat";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {HookFormInput} from "@/views/common/_feat";
import {HookFormSortToggle} from "@/views/common/_feat";
import {Button} from "@/common/components/ui";
import {X} from "lucide-react";

/** Props for the BrowsePersonsQueryOptionsView component. */
type ViewProps = {
    className?: string
};

/**
 * Form section for filtering and sorting persons.
 */
export function BrowsePersonsQueryOptionsFormView(
    {className}: ViewProps
): ReactElement {
    const {control, watch, reset} = useFormContext();
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) throw new Error(`'${BrowsePersonsQueryOptionsFormView.name}' requires a 'submitHandler'.`);
    useAutoFormSubmit({submitHandler});

    const values = watch();
    const hasValues = Object.entries(values).filter(([_, value]) => value).length > 0;

    const clearFilters = () => reset({name: "", sortByName: "1"});

    return (
        <div className={cn("flex max-md:flex-col max-md:space-y-2 md:items-center md:space-x-5", className)}>
            <div className="space-x-2 flex items-center">
                <span className="primary-text font-bold text-sm">Name</span>
                <HookFormInput name="name" placeholder="Name" control={control}/>
            </div>

            <HookFormSortToggle label="Sort By Name" name="sortByName"/>

            {
                hasValues && (
                    <Button variant="secondary" onClick={clearFilters}>
                        <X/>
                    </Button>
                )
            }
        </div>
    );
}