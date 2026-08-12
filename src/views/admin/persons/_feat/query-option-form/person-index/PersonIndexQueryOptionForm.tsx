import {createQueryOptionForm} from "@/common/_feat";
import {
    PersonIndexQueryOptionSchema
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionSchema.ts";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm({
    schema: PersonIndexQueryOptionSchema,
    name: "person-index-query-option-form",
});

export {
    QueryOptionForm as PersonIndexQueryOptionForm,
    useQueryOptionForm as usePersonIndexQueryOptionForm,
};