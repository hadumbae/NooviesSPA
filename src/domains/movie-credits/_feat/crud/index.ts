import {MovieCreditCRUDBaseURL} from "@/domains/movie-credits/_feat/crud/baseURL.ts";
import {
    create, destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/movie-credits/_feat/crud/repository.ts";

export {
    MovieCreditCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}

