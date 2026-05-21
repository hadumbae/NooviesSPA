import {MovieCRUDBaseURL} from "@/domains/movies/_feat/crud/MovieCRUDBaseURL.ts";
import {
    create,
    destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/movies/_feat/crud/MovieCRUDRepository.ts";

export {
    MovieCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}

