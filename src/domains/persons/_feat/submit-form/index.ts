import {
    PersonFormData, PersonFormResolverSchema,
    PersonFormSchema, PersonFormValues,
    PersonFormValuesSchema
} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";
import {useSubmitPersonData} from "@/domains/persons/_feat/submit-form/useSubmitPersonData.ts";
import {usePersonSubmitForm} from "@/domains/persons/_feat/submit-form/usePersonSubmitForm.ts";

export {
    PersonFormSchema,
    PersonFormValuesSchema,
    PersonFormResolverSchema,
    usePersonSubmitForm,
    useSubmitPersonData,
}

export type {
    PersonFormData,
    PersonFormValues,
}

