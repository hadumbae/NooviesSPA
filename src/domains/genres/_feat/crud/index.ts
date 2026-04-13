import {
    create, destroy,
    find,
    findByID,
    paginated,
    query, update
} from "@/domains/genres/_feat/crud/GenreCRUDRepository.ts";
import {GenreCRUDBaseURL} from "@/domains/genres/_feat/crud/baseURL.ts";


export {
    GenreCRUDBaseURL,
    find,
    findByID,
    paginated,
    query,
    create,
    update,
    destroy,
}