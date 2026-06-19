import {
    create,
    destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/genres/_feat/crud/repository.ts";
import {GenreCRUDBaseURL} from "@/domains/genres/_feat/crud/baseURL.ts";

export {
    GenreCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}