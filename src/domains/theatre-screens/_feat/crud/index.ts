import {TheatreScreenCRUDBaseURL} from "@/domains/theatre-screens/_feat/crud/baseURL.ts";
import {
    create, destroy,
    find,
    findByID,
    findBySlug,
    paginated, query,
    update
} from "@/domains/theatre-screens/_feat/crud/repository.ts";

export {
    TheatreScreenCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    create,
    update,
    destroy,
    query,
}

