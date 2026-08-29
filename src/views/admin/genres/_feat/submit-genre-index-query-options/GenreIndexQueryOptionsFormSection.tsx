import {createQueryOptionFormSection} from "@/common/_feat";
import {useGenreIndexQueryOptionsContext} from "@/domains/genres";
import {
    GenreIndexQueryOptionsForm
} from "@/views/admin/genres/_feat/submit-genre-index-query-options/GenreIndexQueryOptionsForm.tsx";
import {
    GenreIndexQueryOptionsFormView
} from "@/views/admin/genres/_feat/submit-genre-index-query-options/GenreIndexQueryOptionsFormView.tsx";

const section = createQueryOptionFormSection({
    useQueryOptionsContext: useGenreIndexQueryOptionsContext,
    queryOptionForm: GenreIndexQueryOptionsForm,
    formView: GenreIndexQueryOptionsFormView,
});

export {
    section as GenreIndexQueryOptionsFormSection,
}