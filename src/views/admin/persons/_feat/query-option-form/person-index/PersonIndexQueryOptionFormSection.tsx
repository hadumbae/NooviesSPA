/**
 * @fileoverview Form section configuration combining context, form state, and view for person index query options.
 */

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

/** Form section component for managing and displaying person index query options. */
export {
    section as PersonIndexQueryOptionFormSection,
}