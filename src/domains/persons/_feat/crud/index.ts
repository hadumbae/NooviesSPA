import {PersonCRUDBaseURL} from "@/domains/persons/_feat/crud/baseURL.ts";
import {
    create, destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query, update
} from "@/domains/persons/_feat/crud/PersonCRUDRepository.ts";

export {
    PersonCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}

