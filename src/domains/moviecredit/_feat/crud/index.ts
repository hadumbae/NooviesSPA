import {MovieCreditCRUDBaseURL} from "@/domains/moviecredit/_feat/crud/baseURL.ts";
import {
    create, destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/moviecredit/_feat/crud/repository.ts";

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

