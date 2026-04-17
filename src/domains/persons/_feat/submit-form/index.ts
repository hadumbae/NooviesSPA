import {
    PersonFormData, PersonFormResolverSchema,
    PersonFormSchema, PersonFormValues,
    PersonFormValuesSchema
} from "@/domains/persons/_feat/submit-form/PersonFormSchema.ts";
import {usePersonSubmitForm} from "@/domains/persons/_feat/submit-form/usePersonSubmitForm.ts";

export {
    PersonFormSchema,
    PersonFormValuesSchema,
    PersonFormResolverSchema,
    usePersonSubmitForm,
}

export type {
    PersonFormData,
    PersonFormValues,
}

