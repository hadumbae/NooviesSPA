/**
 * @fileoverview Repository for movie data access and persistence operations.
 */

import {
    handleCreate,
    handleDelete, handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
    handleQuery,
    handleUpdate
} from "@/common/_feat/crud-handlers";
import {MovieCRUDBaseURL} from "@/domains/movies/_feat/crud/MovieCRUDBaseURL.ts";

/** Retrieves all movie records. */
export const find = handleFind(MovieCRUDBaseURL);
/** Finds a movie by its unique identifier. */
export const findByID = handleFindByID(MovieCRUDBaseURL);
/** Finds a movie by its URL-friendly slug. */
export const findBySlug = handleFindBySlug(MovieCRUDBaseURL);
/** Retrieves a paginated list of movies. */
export const paginated = handlePaginated(MovieCRUDBaseURL);
/** Queries movies based on provided filter criteria. */
export const query = handleQuery(MovieCRUDBaseURL);
/** Creates a new movie record. */
export const create = handleCreate(MovieCRUDBaseURL);
/** Updates an existing movie record. */
export const update = handleUpdate(MovieCRUDBaseURL);
/** Deletes a movie record. */
export const destroy = handleDelete(MovieCRUDBaseURL);