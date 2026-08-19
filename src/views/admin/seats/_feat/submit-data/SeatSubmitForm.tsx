/**
 * @fileoverview Defines the form component and hook for submitting seat data.
 */

import {createForm} from "@/common/_feat";
import {Seat, SeatDetails, SeatFormData, SeatFormSchema, SeatFormValues, useSeatSubmitMutation} from "@/domains/seats";

const {SubmitForm, useSubmitForm} = createForm<
    SeatFormValues,
    SeatFormData,
    Seat,
    SeatDetails
>({
    schema: SeatFormSchema,
    formName: "seat-submit-form",
    mutation: useSeatSubmitMutation,
    defaultValues: {
        layoutType: "SEAT",
        row: "",
        x: 1,
        y: 1,
        theatre: undefined,
        screen: undefined,
        seatNumber: 1,
        seatLabel: "",
        seatType: "REGULAR",
        isAvailable: true,
        priceMultiplier: 1,
    }
});

export {
    /** Form component for submitting seat creation and update forms. */
        SubmitForm as SeatSubmitForm,
    /** Custom hook for managing the seat submit form state and mutation handler. */
        useSubmitForm as useSeatSubmitForm,
}