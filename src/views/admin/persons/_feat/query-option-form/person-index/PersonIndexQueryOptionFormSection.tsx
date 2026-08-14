import {
    PersonIndexQueryOptionForm
} from "@/views/admin/persons/_feat/query-option-form/person-index/PersonIndexQueryOptionForm.tsx";
import {
    usePersonIndexQueryOptionsContext
} from "@/domains/persons/_feat/validate-query-options/person-index/PersonIndexQueryOptionsContext.ts";
import {createQueryOptionFormSection} from "@/common/_feat";
import {
    PersonIndexQueryOptionsFormView
} from "@/views/admin/persons/_feat/query-option-form/person-index/PersonIndexQueryOptionsFormView.tsx";

const section = createQueryOptionFormSection({
    queryOptionForm: PersonIndexQueryOptionForm,
    useQueryOptionsContext: usePersonIndexQueryOptionsContext,
    formView: PersonIndexQueryOptionsFormView,
});

export {
    section as PersonIndexQueryOptionFormSection,
}