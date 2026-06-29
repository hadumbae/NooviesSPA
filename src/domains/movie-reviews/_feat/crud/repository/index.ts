import {MovieReviewCRUDBaseURL} from "@/domains/movie-reviews/_feat/crud/repository/baseURL.ts";
import {destroy, findByID, findBySlug, paginated} from "@/domains/movie-reviews/_feat/crud/repository/repository.ts";

export {
    MovieReviewCRUDBaseURL,
    findByID,
    findBySlug,
    paginated,
    destroy,
}

