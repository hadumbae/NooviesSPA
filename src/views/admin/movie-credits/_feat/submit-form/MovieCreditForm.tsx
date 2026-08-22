/**
 * @fileoverview Defines the form component and hook for submitting movie credit data.
 */

import {createForm} from "@/common/_feat";
import {
    MovieCredit,
    MovieCreditDetails,
    MovieCreditFormData,
    MovieCreditFormSchema,
    MovieCreditFormValues,
    useMovieCreditSubmitMutation
} from "@/domains/movie-credits";

const {SubmitForm, useSubmitForm} = createForm<
    MovieCreditFormValues,
    MovieCreditFormData,
    MovieCredit,
    MovieCreditDetails
>({
    schema: MovieCreditFormSchema,
    mutation: useMovieCreditSubmitMutation,
    formName: "movie-credit-submit-form",
    defaultValues: {
        department: "",
        movie: undefined,
        person: undefined,
        roleType: undefined,
        displayRoleName: "",
        notes: "",
        creditedAs: "",
        characterName: "",
        billingOrder: "",
        isPrimary: false,
        uncredited: false,
        voiceOnly: false,
        cameo: false,
        motionCapture: false,
        archiveFootage: false,
    },
});

export {
    /** Form component for submitting movie credit creation and update forms. */
        SubmitForm as MovieCreditForm,
    /** Custom hook for managing the movie credit submit form state and mutation handler. */
        useSubmitForm as useMovieCreditSubmitForm,
}