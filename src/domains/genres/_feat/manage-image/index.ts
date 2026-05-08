import {
    patchRemoveGenreImage,
    patchUpdateGenreImage
} from "@/domains/genres/_feat/manage-image/repository/repository.ts";
import {ManageGenreImageBaseURL} from "@/domains/genres/_feat/manage-image/repository/baseURL.ts";
import {
    RemoveGenreImageConfig,
    UpdateGenreImageConfig
} from "@/domains/genres/_feat/manage-image/repository/repository.types.ts";
import {
    type GenreImageUploadBaseForm,
    GenreImageUploadBaseFormSchema,
    type GenreImageUploadFormData,
    GenreImageUploadFormSchema
} from "@/domains/genres/_feat/manage-image/form/GenreImageUploadFormSchema.ts";
import {ManageGenreImageMutationKeys} from "@/domains/genres/_feat/manage-image/mutations/mutationKeys.ts";
import {useGenreImageUploadForm} from "@/domains/genres/_feat/manage-image/form/useGenreImageUploadForm.ts";
import {useRemoveGenreImage} from "@/domains/genres/_feat/manage-image/mutations/useRemoveGenreImage.ts";
import {useUploadGenreImage} from "@/domains/genres/_feat/manage-image/mutations/useUploadGenreImage.ts";

export {
    ManageGenreImageBaseURL,
    patchUpdateGenreImage,
    patchRemoveGenreImage,
    GenreImageUploadBaseFormSchema,
    GenreImageUploadFormSchema,
    ManageGenreImageMutationKeys,
    useGenreImageUploadForm,
    useRemoveGenreImage,
    useUploadGenreImage,
}

export type {
    UpdateGenreImageConfig,
    RemoveGenreImageConfig,
    GenreImageUploadBaseForm,
    GenreImageUploadFormData,
}

