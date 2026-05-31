/**
 * @fileoverview Repository for movie review data access and persistence operations.
 */

import {
    handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
} from "@/common/_feat/crud-handlers";
import {MovieReviewCRUDBaseURL} from "@/domains/review/_feat";

/** Finds a movie review by its unique identifier. */
export const findByID = handleFindByID(MovieReviewCRUDBaseURL);

/** Finds a movie review by its URL-friendly slug. */
export const findBySlug = handleFindBySlug(MovieReviewCRUDBaseURL);

/** Finds a movie review based on provided filter criteria. */
export const find = handleFind(MovieReviewCRUDBaseURL);

/** Retrieves a paginated list of movie reviews. */
export const paginated = handlePaginated(MovieReviewCRUDBaseURL);

/** Deletes a movie review record. */
export const destroy = handleDelete(MovieReviewCRUDBaseURL);
