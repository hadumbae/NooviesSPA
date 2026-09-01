/**
 * @fileoverview Form section configuration combining context, form state, and view for movie index query options.
 */

import {createQueryOptionFormSection} from "@/common/_feat";
import {
    useMovieIndexQueryOptionsContext
} from "@/domains/movies/_feat/handle-query-options/movie-index/MovieIndexQueryOptionsContext.ts";
import {MovieIndexQueryOptionForm} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionForm.tsx";
import {
    MovieIndexQueryOptionFormView
} from "@/views/admin/movies/_feat/query-options-form/MovieIndexQueryOptionFormView.tsx";

const section = createQueryOptionFormSection({
    queryOptionForm: MovieIndexQueryOptionForm,
    formView: MovieIndexQueryOptionFormView,
    useQueryOptionsContext: useMovieIndexQueryOptionsContext,
});

/** Form section component for managing and displaying movie index query options. */
export {
    section as MovieIndexQueryOptionFormSection,
}