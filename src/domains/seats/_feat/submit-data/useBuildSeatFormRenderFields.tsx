/**
 * @fileoverview Custom hook that abstracts the conditional rendering logic for seat form fieldsets,
 * toggling groups based on layout type (Seat vs. Structural) and field disable state.
 */

import {useFormContext} from "react-hook-form";
import {HookFormFieldGroup} from "@/common/type/form/HookFormFieldGroupTypes.ts";
import {SeatFormValues} from "@/domains/seats/_feat/submit-data/schemas/SeatFormValuesSchema.ts";
import {SeatSubmitFormLayoutFieldset} from "@/views/admin/seats/_feat/submit-data/form-view/SeatSubmitFormLayoutFieldset.tsx";
import {
    SeatSubmitFormDetailsFieldset
} from "@/views/admin/seats/_feat/submit-data/form-view/SeatSubmitFormDetailsFieldset.tsx";
import {
    SeatSubmitFormNonSeatFieldset
} from "@/views/admin/seats/_feat/submit-data/form-view/SeatSubmitFormNonSeatFieldset.tsx";
import {SeatSubmitFormRowFieldset} from "@/views/admin/seats/_feat/submit-data/form-view/SeatSubmitFormRowFieldset.tsx";
import {
    SeatSubmitFormCoordinateFieldset
} from "@/views/admin/seats/_feat/submit-data/form-view/SeatSubmitFormCoordinateFieldset.tsx";
import {SeatSubmitFormSeatFieldset} from "@/views/admin/seats/_feat/submit-data/form-view/SeatSubmitFormSeatFieldset.tsx";
import {cloneElement, ReactElement} from "react";

/** Props for filtering and disabling specific form fields. */
export type FieldsProps = {
    disableFields?: Partial<Record<keyof SeatFormValues, boolean>>;
}

/**
 * Constructs an array of React elements representing the active fieldsets for a seat form.
 */
export function useBuildSeatFormRenderFields(
    {disableFields}: FieldsProps
): (ReactElement | null)[] {
    const {watch} = useFormContext();
    const layoutType = watch("layoutType");
    const isSeat = layoutType === "SEAT";

    const fieldGroups: HookFormFieldGroup<SeatFormValues>[] = [
        {
            render: true,
            key: "seat-layout-field-set",
            fields: ["layoutType"],
            element: <SeatSubmitFormLayoutFieldset disableFields={disableFields} key="layout-1"/>
        },
        {
            render: true,
            key: "details-2",
            fields: ["theatre", "screen"],
            element: <SeatSubmitFormDetailsFieldset disableFields={disableFields}/>
        },
        {
            render: !isSeat,
            key: "non-seat-3",
            fields: ["row", "x", "y"],
            element: <SeatSubmitFormNonSeatFieldset disableFields={disableFields}/>
        },
        {
            render: isSeat,
            key: "row-3",
            fields: ["row", "seatNumber", "seatLabel"],
            element: <SeatSubmitFormRowFieldset disableFields={disableFields} isPanel/>
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
            element: <SeatSubmitFormSeatFieldset disableFields={disableFields} isPanel/>
        },
    ];

    return fieldGroups.map(({render, fields, key, element}) =>
        render && fields.some((field) => !disableFields?.[field])
            ? cloneElement(element, {key})
            : null
    );
}