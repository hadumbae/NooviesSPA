import {MovieReviewCRUDBaseURL} from "@/domains/movieReviews/_feat/crud/repository/baseURL.ts";
import {destroy, findByID, findBySlug, paginated, query} from "@/domains/movieReviews/_feat/crud/repository/repository.ts";

export {
    MovieReviewCRUDBaseURL,
    findByID,
    findBySlug,
    query,
    paginated,
    destroy,
}

