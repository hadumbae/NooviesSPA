/**
 * @fileoverview Form component and hook exports for managing movie index query options.
 */

import {createQueryOptionForm} from "@/common/_feat";
import {MovieIndexQueryOptionsSchema} from "@/domains/movies";

const {QueryOptionForm, useQueryOptionForm} = createQueryOptionForm({
    name: "movie-index-query-option-form",
    schema: MovieIndexQueryOptionsSchema,
});

export {
    /** Form component for managing movie index query options. */
        QueryOptionForm as MovieIndexQueryOptionForm,
    /** Hook for controlling the movie index query option form state. */
        useQueryOptionForm as useMovieIndexQueryOptionForm,
}