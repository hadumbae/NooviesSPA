/**
 * @file Request repository for MovieReview CRUD operations.
 * MovieReviewCRUDRepository.ts
 */

import {createRequestRepository} from "@/common/repositories/request-repository/RequestRepository.ts";

/**
 * Base API endpoint for user MovieReview CRUD requests.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/movie/reviews`;

/**
 * Configured request repository for MovieReview CRUD endpoints.
 */
const repository = createRequestRepository({baseURL});

export {
    repository as MovieReviewCRUDRepository,
}