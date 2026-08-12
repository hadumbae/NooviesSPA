/**
 * @fileoverview Defines the form component and hook for submitting person entity data.
 */

import {createForm} from "@/common/_feat";
import {PersonEditData, PersonFormData, PersonFormSchema, PersonFormValues,} from "@/domains/persons/_feat/submit-form";
import {useSubmitPersonData} from "@/domains/persons/_feat/crud-hooks";
import {Person} from "@/domains/persons/_schema";

const {SubmitForm, useSubmitForm} = createForm<
    PersonFormValues,
    PersonFormData,
    PersonEditData,
    Person
>({
    formName: "person-submit-form",
    schema: PersonFormSchema,
    mutation: useSubmitPersonData,
    defaultValues: {
        name: "",
        biography: "",
        nationality: "",
        dob: "",
    }
});

export {
    /** React form component for submitting person entity data. */
        SubmitForm as PersonSubmitForm,
    /** Custom hook for managing state and submission of the person form. */
        useSubmitForm as usePersonSubmitForm,
}