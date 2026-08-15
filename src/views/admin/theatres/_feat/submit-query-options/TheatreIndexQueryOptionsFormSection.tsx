/**
 * @fileoverview Creates the form section component for managing theatre index query options.
 */

import {createQueryOptionFormSection} from "@/common/_feat";
import {
    TheatreIndexQueryOptions,
    TheatreIndexQueryOptionsFormValues,
    useTheatreIndexQueryOptionsContext
} from "@/domains/theatres";
import {
    TheatreIndexQueryOptionsFormView
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsFormView.tsx";
import {
    TheatreIndexQueryOptionsForm
} from "@/views/admin/theatres/_feat/submit-query-options/TheatreIndexQueryOptionsForm.tsx";

const section = createQueryOptionFormSection<
    TheatreIndexQueryOptionsFormValues,
    TheatreIndexQueryOptions
>({
    useQueryOptionsContext: useTheatreIndexQueryOptionsContext,
    formView: TheatreIndexQueryOptionsFormView,
    queryOptionForm: TheatreIndexQueryOptionsForm
});

/** Form section component for filtering and sorting theatres in the index view. */
export {
    section as TheatreIndexQueryOptionsFormSection,
}