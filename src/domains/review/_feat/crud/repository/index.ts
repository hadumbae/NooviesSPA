import {MovieReviewCRUDBaseURL} from "@/domains/review/_feat/crud/repository/baseURL.ts";
import {destroy, findByID, findBySlug, paginated, query} from "@/domains/review/_feat/crud/repository/repository.ts";

export {
    MovieReviewCRUDBaseURL,
    findByID,
    findBySlug,
    query,
    paginated,
    destroy,
}

