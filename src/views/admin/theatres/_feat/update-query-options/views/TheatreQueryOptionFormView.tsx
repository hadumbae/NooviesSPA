/**
 * @fileoverview Renders the admin form view for configuring and submitting theatre query options.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {Separator} from "@/views/common/_comp/ui/separator.tsx";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {useAutoFormSubmit} from "@/common/_feat/submit-data";
import {DisableFields} from "@/common/_types";

import {TheatreQueryOptionFormStarterValues} from "@/domains/theatres";
import {
    TheatreQueryOptionFormFilterFieldset,
    TheatreQueryOptionFormSortFieldset
} from "@/views/admin/theatres/_feat/update-query-options/fieldsets";
import {PageSectionHeader} from "@/views/common/_comp/page";

/** Props for the TheatreQueryOptionFormView component. */
type FormProps = {
    className?: string;
    disableFields?: DisableFields<TheatreQueryOptionFormStarterValues>;
}

/**
 * Renders a form for theatre query options that automatically submits on change.
 * Divides form controls into filter and sort fieldsets based on the active schema.
 */
export function TheatreQueryOptionFormView(
    {className, disableFields}: FormProps
): ReactElement {
    const {submitHandler} = useBaseFormContext();

    if (!submitHandler) {
        throw new Error(`${TheatreQueryOptionFormView.name} requires a 'submitHandler'.`)
    }

    useAutoFormSubmit({submitHandler, timeout: 450});

    return (
        <div className={cn("space-y-4", className)}>
            <section>
                <PageSectionHeader text="Filters"/>
                <TheatreQueryOptionFormFilterFieldset disableFields={disableFields}/>
            </section>

            <Separator/>

            <section>
                <PageSectionHeader text="Sorts"/>
                <TheatreQueryOptionFormSortFieldset disableFields={disableFields}/>
            </section>
        </div>
    );
}
