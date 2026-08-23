/**
 * @fileoverview Defines the multi-step form component, hook, and storage key for submitting showing data.
 */

import {createMultiStepForm} from "@/common/_feat/forms/create-multi-step-form/createMultiStepForm.tsx";
import {
    ShowingDetails,
    ShowingEditData,
    ShowingFormData,
    ShowingFormSchema,
    ShowingFormValues,
    useShowingSubmitMutation
} from "@/domains/showings";

const {SubmitForm, useSubmitForm} = createMultiStepForm<
    ShowingFormValues,
    ShowingFormData,
    ShowingEditData,
    ShowingDetails
>({
    formName: "showing-submit-form",
    schema: ShowingFormSchema,
    mutation: useShowingSubmitMutation,
    defaultValues: {
        startAtDate: "",
        startAtTime: "",
        endAtDate: "",
        endAtTime: "",
        ticketPrice: "",
        language: "",
        subtitleLanguages: [],
        movie: "",
        theatre: "",
        screen: "",
        status: "SCHEDULED",
        localTimezone: "",
        theatreCity: "",
        theatreState: "",
        theatreCountry: undefined,
        config: {
            isActive: true,
            isSpecialEvent: false,
            canReserveSeats: false
        },
    },
});

/** Storage key for persisting showing form state. */
const ShowingSubmitStorageKey = "showing-submit-form-data";

export {
    ShowingSubmitStorageKey,
    /** Multi-step form component for submitting showing creation and update forms. */
        SubmitForm as ShowingSubmitForm,
    /** Custom hook for managing the showing multi-step form state and mutation handler. */
        useSubmitForm as useShowingSubmitForm,
}