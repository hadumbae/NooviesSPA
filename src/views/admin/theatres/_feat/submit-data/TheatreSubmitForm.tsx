/**
 * @fileoverview Defines the form component and hook for submitting theatre data.
 */

import {createForm} from "@/common/_feat";
import {
    Theatre,
    TheatreEditData,
    TheatreFormData,
    TheatreFormValues,
    useTheatreSubmitMutation
} from "@/domains/theatres";
import {TheatreFormSchema} from "@/domains/theatres/_feat/submit-data/schema.ts";

const {SubmitForm, useSubmitForm} = createForm<
    TheatreFormValues,
    TheatreFormData,
    TheatreEditData,
    Theatre
>({
    formName: "theatre-submit-form",
    mutation: useTheatreSubmitMutation,
    schema: TheatreFormSchema,
    defaultValues: {
        name: "",
        seatCapacity: "",
        location: {
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            timezone: "",
            includeCoordinates: false,
            coordinates: {
                type: "Point",
                coordinates: [
                    "",
                    "",
                ],
            },
        },
    }
});

export {
    /** Form component for submitting theatre creation and update forms. */
        SubmitForm as TheatreSubmitForm,
    /** Custom hook for managing the theatre submit form state and mutation handler. */
        useSubmitForm as useTheatreSubmitForm,
}