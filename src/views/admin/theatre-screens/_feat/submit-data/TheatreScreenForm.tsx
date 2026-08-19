/**
 * @fileoverview Form component and hook for submitting theatre screen data.
 */

import {createForm} from "@/common/_feat";
import {
    TheatreScreen,
    TheatreScreenDetails,
    TheatreScreenFormData,
    TheatreScreenFormSchema,
    TheatreScreenFormValues,
    useTheatreScreenSubmitMutation
} from "@/domains/theatre-screens";

const {SubmitForm, useSubmitForm} = createForm<
    TheatreScreenFormValues,
    TheatreScreenFormData,
    TheatreScreen,
    TheatreScreenDetails
>({
    formName: "screen-submit-form",
    schema: TheatreScreenFormSchema,
    mutation: useTheatreScreenSubmitMutation,
    defaultValues: {
        name: "",
        capacity: "",
        screenType: undefined,
        theatre: undefined,
    },
});

export {
    /** Form component for submitting theatre screen data. */
        SubmitForm as TheatreScreenForm,
    /** Custom hook for managing the theatre screen submit form state and mutation handler. */
        useSubmitForm as useTheatreScreenForm,
}