import {MovieCRUDBaseURL} from "@/domains/movies/_feat/crud/MovieCRUDBaseURL.ts";
import {
    create,
    destroy,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/movies/_feat/crud/MovieCRUDRepository.ts";


export {
    MovieCRUDBaseURL,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}

