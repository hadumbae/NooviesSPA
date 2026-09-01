/**
 * @fileoverview Form component and hook exports for submitting seat map configuration data.
 */

import {createForm} from "@/common/_feat";
import {SeatMap, SeatMapDetails,} from "@/domains/seatmaps/_schema/model";
import {SeatMapFormData, SeatMapFormSchema, SeatMapFormValues,} from "@/domains/seatmaps/_feat/submit-data/schema";
import {useSeatMapSubmitMutation} from "@/domains/seatmaps/_feat/crud-hooks/submit";

const {SubmitForm, useSubmitForm} = createForm<
    SeatMapFormValues,
    SeatMapFormData,
    SeatMap,
    SeatMapDetails
>({
    schema: SeatMapFormSchema,
    mutation: useSeatMapSubmitMutation,
    formName: "seat-map-form",
    defaultValues: {
        showing: undefined,
        seat: undefined,
        basePrice: "",
        priceMultiplier: "",
        overridePrice: "",
        status: undefined,
    },
});

export {
    /** Form component for submitting seat map configuration data. */
        SubmitForm as SeatMapSubmitForm,
    /** Hook for managing seat map submit form state. */
        useSubmitForm as useSeatMapSubmitForm,
}