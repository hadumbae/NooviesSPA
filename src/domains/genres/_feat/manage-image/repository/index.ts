import {ManageGenreImageBaseURL} from "@/domains/genres/_feat/manage-image/repository/baseURL.ts";
import {
    patchRemoveGenreImage,
    patchUpdateGenreImage
} from "@/domains/genres/_feat/manage-image/repository/repository.ts";
import {
    RemoveGenreImageConfig,
    UpdateGenreImageConfig
} from "@/domains/genres/_feat/manage-image/repository/repository.types.ts";

export {
    ManageGenreImageBaseURL,
    patchUpdateGenreImage,
    patchRemoveGenreImage,
}

export type {
    UpdateGenreImageConfig,
    RemoveGenreImageConfig,

}

