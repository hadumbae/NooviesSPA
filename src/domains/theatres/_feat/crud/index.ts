import {TheatreCRUDBaseURL} from "@/domains/theatres/_feat/crud/baseURL.ts";
import {
    destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update,
    create,
} from "@/domains/theatres/_feat/crud/repository.ts";

export {
    TheatreCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}