/**
 * @fileoverview Form component and hook exports for managing genre index query option form state.
 */

import {createQueryOptionForm} from "@/common/_feat";
import {GenreIndexQueryOptionsSchema} from "@/domains/genres";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm({
    schema: GenreIndexQueryOptionsSchema,
    name: "genre-index-query-options-form",
});

export {
    /** Form component for genre index query options. */
        QueryOptionForm as GenreIndexQueryOptionsForm,
    /** Hook for managing genre index query options form state. */
        useQueryOptionForm as useGenreIndexQueryOptionsForm,
}