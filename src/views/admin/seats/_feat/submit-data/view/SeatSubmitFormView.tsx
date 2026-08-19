/**
 * @fileoverview Pure view component for the seat submission form, rendering dynamic fieldsets and action buttons.
 */

import {cloneElement, ReactElement} from "react";
import {cn, FormFieldsetProps} from "@/common/_feat";
import {SeatFormValues} from "@/domains/seats";
import {useFormContext} from "react-hook-form";
import {HookFormFieldsetConfig} from "@/common/_types/form/HookFormFieldsetConfigTypes.ts";
import {
    SeatSubmitFormCoordinateFieldset,
    SeatSubmitFormDetailsFieldset,
    SeatSubmitFormLayoutFieldset,
    SeatSubmitFormNonSeatFieldset,
    SeatSubmitFormRowFieldset,
    SeatSubmitFormSeatFieldset
} from "@/views/admin/seats";

type ViewProps = FormFieldsetProps<SeatFormValues> & {
    isNestedView?: boolean;
}

/**
 * Renders the structural layout of the seat form, including conditional fieldsets and submission controls.
 */
export function SeatSubmitFormView(
    {disableFields, hideFields, className, isNestedView}: ViewProps
): ReactElement {
    const {watch} = useFormContext();

    const layoutType = watch("layoutType");
    const isSeat = layoutType === "SEAT";

    const fieldGroups: HookFormFieldsetConfig<SeatFormValues>[] = [
        {
            render: true,
            key: "layout-1",
            fields: ["layoutType"],
            element: (
                <SeatSubmitFormLayoutFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                />
            )
        },
        {
            render: true,
            key: "details-2",
            fields: ["theatre", "screen"],
            element: (
                <SeatSubmitFormDetailsFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
        {
            render: !isSeat,
            key: "non-seat-3",
            fields: ["row", "x", "y"],
            element: (
                <SeatSubmitFormNonSeatFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
        {
            render: isSeat,
            key: "row-3",
            fields: ["row", "seatNumber", "seatLabel"],
            element: (
                <SeatSubmitFormRowFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
        {
            render: isSeat,
            key: "coordinates-4",
            fields: ["x", "y"],
            element: (
                <SeatSubmitFormCoordinateFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                />
            )
        },
        {
            render: isSeat,
            key: "seat-5",
            fields: ["seatType", "priceMultiplier", "isAvailable"],
            element: (
                <SeatSubmitFormSeatFieldset
                    hideFields={hideFields}
                    disableFields={disableFields}
                    isNestedView={isNestedView}
                />
            )
        },
    ];

    return (
        <div className={cn("space-y-4", className)}>
            {
                fieldGroups.map(({render, fields, key, element}) =>
                    render && fields.some((field) => !hideFields?.[field])
                        ? cloneElement(element, {key})
                        : null
                )
            }
        </div>
    );
}