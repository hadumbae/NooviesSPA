/**
 * @fileoverview Presentational view for the Theatre submission form.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {
    TheatreSubmitFormDetailsFieldset,
    TheatreSubmitFormLocationFieldset,
} from "@/views/admin/theatres/_feat/submit-data/fieldsets";
import {TheatreFormValues} from "@/domains/theatres";

/** Props for the TheatreSubmitFormView component. */
type TheatreSubmitFormViewProps = FormViewProps<TheatreFormValues>;

/** Renders the UI layout for creating or updating a theatre. */
export function TheatreSubmitFormView(
    {className, disableFields}: TheatreSubmitFormViewProps
): ReactElement {
    return (
        <div className={cn("space-y-4", className)}>
            <TheatreSubmitFormDetailsFieldset disableFields={disableFields}/>
            {!disableFields?.location && <TheatreSubmitFormLocationFieldset/>}
        </div>
    );
}