/**
 * @fileoverview Pure view component for the seat submission form, rendering dynamic fieldsets and action buttons.
 */

import {ReactElement} from "react";
import {cn, FormFieldsetProps} from "@/common/_feat";
import {SeatFormValues, useBuildSeatFormRenderFields} from "@/domains/seats";

type ViewProps = FormFieldsetProps<SeatFormValues> & {
    isNestedView?: boolean;
}

/**
 * Renders the structural layout of the seat form, including conditional fieldsets and submission controls.
 */
export function SeatSubmitFormView(
    {disableFields, className, isNestedView}: ViewProps
): ReactElement {
    const renderedFields = useBuildSeatFormRenderFields({disableFields, isNestedView});

    return (
        <div className={cn("space-y-4", className)}>
            {renderedFields}
        </div>
    );
}