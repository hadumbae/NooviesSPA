import {
    create,
    destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/seats/_feat/crud/repository.ts";
import {SeatCRUDBaseURL} from "@/domains/seats/_feat/crud/baseURL.ts";

export {
    SeatCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}