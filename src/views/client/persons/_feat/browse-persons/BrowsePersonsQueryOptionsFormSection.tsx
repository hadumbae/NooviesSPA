/**
 * @fileoverview Creates the form section component for browsing persons query options.
 */

import {BrowsePersonsQueryOptionForm, BrowsePersonsQueryOptionsFormView} from "@/views/client/persons";
import {createQueryOptionFormSection} from "@/common/_feat";
import {useBrowsePersonsQueryOptionsContext} from "@/domains/persons";

/** Form section component for configuring and submitting browse persons query options. */
export const BrowsePersonsQueryOptionsFormSection = createQueryOptionFormSection({
    queryOptionForm: BrowsePersonsQueryOptionForm,
    useQueryOptionsContext: useBrowsePersonsQueryOptionsContext,
    formView: BrowsePersonsQueryOptionsFormView,
});