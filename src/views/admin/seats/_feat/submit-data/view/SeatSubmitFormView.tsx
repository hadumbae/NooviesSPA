/**
 * @fileoverview Pure view component for the seat submission form, rendering dynamic fieldsets and action buttons.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes.ts";
import {SeatFormValues, useBuildSeatFormRenderFields} from "@/domains/seats";

/**
 * Renders the structural layout of the seat form, including conditional fieldsets and submission controls.
 */
export function SeatSubmitFormView(
    {disableFields, className, isNestedView}: Omit<FormViewProps<SeatFormValues>, "children">
): ReactElement {
    const renderedFields = useBuildSeatFormRenderFields({disableFields, isNestedView});

    return (
        <div className={cn("space-y-4", className)}>
            {renderedFields}
        </div>
    );
}