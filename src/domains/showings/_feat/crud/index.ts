import {ShowingCRUDBaseURL} from "@/domains/showings/_feat/crud/baseURL.ts";
import {
    create,
    destroy,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    update
} from "@/domains/showings/_feat/crud/repository.ts";

export {
    ShowingCRUDBaseURL,
    find,
    findByID,
    findBySlug,
    paginated,
    query,
    create,
    update,
    destroy,
}

