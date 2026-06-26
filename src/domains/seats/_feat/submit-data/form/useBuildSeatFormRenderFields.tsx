/**
 * @fileoverview Custom hook that abstracts the conditional rendering logic for seat form fieldsets,
 * toggling groups based on layout type (Seat vs. Structural) and field disable state.
 */

import {cloneElement, ReactElement} from "react";
import {useFormContext} from "react-hook-form";
import {HookFormFieldGroup} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {FormViewProps} from "@/common/_feat/submit-data/formTypes";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schema/SeatFormSchema.ts";
import {
    SeatSubmitFormCoordinateFieldset,
    SeatSubmitFormDetailsFieldset,
    SeatSubmitFormLayoutFieldset,
    SeatSubmitFormNonSeatFieldset,
    SeatSubmitFormRowFieldset,
    SeatSubmitFormSeatFieldset
} from "@/views/admin/seats";

/** Props for filtering and disabling specific form fields. */
export type FieldsProps = Pick<FormViewProps<SeatFormValues>, "disableFields" | "isNestedView">

/**
 * Constructs an array of React elements representing the active fieldsets for a seat form.
 */
export function useBuildSeatFormRenderFields(
    {disableFields, isNestedView}: FieldsProps
): (ReactElement | null)[] {
    const {watch} = useFormContext();

    const layoutType = watch("layoutType");
    const isSeat = layoutType === "SEAT";

    const fieldGroups: HookFormFieldGroup<SeatFormValues>[] = [
        {
            render: true,
            key: "layout-1",
            fields: ["layoutType"],
            element: <SeatSubmitFormLayoutFieldset disableFields={disableFields}/>
        },
        {
            render: true,
            key: "details-2",
            fields: ["theatre", "screen"],
            element: <SeatSubmitFormDetailsFieldset disableFields={disableFields} isNestedView={isNestedView}/>
        },
        {
            render: !isSeat,
            key: "non-seat-3",
            fields: ["row", "x", "y"],
            element: <SeatSubmitFormNonSeatFieldset disableFields={disableFields} isNestedView={isNestedView}/>
        },
        {
            render: isSeat,
            key: "row-3",
            fields: ["row", "seatNumber", "seatLabel"],
            element: <SeatSubmitFormRowFieldset disableFields={disableFields} isNestedView={isNestedView}/>
        },
        {
            render: isSeat,
            key: "coordinates-4",
            fields: ["x", "y"],
            element: <SeatSubmitFormCoordinateFieldset disableFields={disableFields}/>
        },
        {
            render: isSeat,
            key: "seat-5",
            fields: ["seatType", "priceMultiplier", "isAvailable"],
            element: <SeatSubmitFormSeatFieldset disableFields={disableFields} isNestedView={isNestedView}/>
        },
    ];

    return fieldGroups.map(({render, fields, key, element}) =>
        render && fields.some((field) => !disableFields?.[field])
            ? cloneElement(element, {key})
            : null
    );
}