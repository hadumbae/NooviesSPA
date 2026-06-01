import {MovieReviewCRUDBaseURL} from "@/domains/movieReviews/_feat/crud/repository/baseURL.ts";
import {destroy, findByID, findBySlug, paginated} from "@/domains/movieReviews/_feat/crud/repository/repository.ts";

export {
    MovieReviewCRUDBaseURL,
    findByID,
    findBySlug,
    paginated,
    destroy,
}

