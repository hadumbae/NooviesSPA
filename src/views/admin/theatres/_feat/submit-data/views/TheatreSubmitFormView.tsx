/**
 * @fileoverview Presentational view for the Theatre submission form.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {TheatreFormStarterValues} from "@/domains/theatres/_feat/submit-data";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {
    TheatreSubmitFormLocationFieldset
} from "@/views/admin/theatres/_feat/submit-data/views/TheatreSubmitFormLocationFieldset.tsx";
import {
    TheatreSubmitFormDetailsFieldset
} from "@/views/admin/theatres/_feat/submit-data/views/TheatreSubmitFormDetailsFieldset.tsx";

/** Props for the TheatreSubmitFormView component. */
type TheatreSubmitFormViewProps = FormViewProps<TheatreFormStarterValues>;

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