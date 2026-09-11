/**
 * @fileoverview Creates the form section component for browsing persons query options.
 */

import {
    BrowsePersonsQueryOptionForm
} from "@/views/client/persons/_feat/browse-persons/BrowsePersonsQueryOptionForm.tsx";
import {
    BrowsePersonsQueryOptionsFormView
} from "@/views/client/persons/_feat/browse-persons/BrowsePersonsQueryOptionsFormView.tsx";
import {createQueryOptionFormSection} from "@/common/_feat";
import {
    useBrowsePersonsQueryOptionsContext
} from "@/domains/persons/_feat/validate-query-options/person-browse/BrowsePersonsQueryOptionsContext.ts";

/** Form section component for configuring and submitting browse persons query options. */
export const BrowsePersonsQueryOptionsFormSection = createQueryOptionFormSection({
    queryOptionForm: BrowsePersonsQueryOptionForm,
    useQueryOptionsContext: useBrowsePersonsQueryOptionsContext,
    formView: BrowsePersonsQueryOptionsFormView,
});