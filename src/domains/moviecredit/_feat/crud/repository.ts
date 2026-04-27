/** @fileoverview CRUD service handlers for movie credits. */

import {MovieCreditCRUDBaseURL} from "@/domains/moviecredit/_feat/crud/baseURL.ts";
import {
    handleCreate,
    handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
    handleQuery,
    handleUpdate
} from "@/common/features/crud-handlers";

/** Retrieves all movie credit records. */
export const find = handleFind(MovieCreditCRUDBaseURL);

/** Retrieves a single movie credit by its unique identifier. */
export const findByID = handleFindByID(MovieCreditCRUDBaseURL);

/** Retrieves a single movie credit by its URL slug. */
export const findBySlug = handleFindBySlug(MovieCreditCRUDBaseURL);

/** Retrieves a paginated list of movie credits. */
export const paginated = handlePaginated(MovieCreditCRUDBaseURL);

/** Performs a filtered search for movie credits. */
export const query = handleQuery(MovieCreditCRUDBaseURL);

/** Creates a new movie credit record. */
export const create = handleCreate(MovieCreditCRUDBaseURL);

/** Updates an existing movie credit record. */
export const update = handleUpdate(MovieCreditCRUDBaseURL);

/** Deletes a movie credit record. */
export const destroy = handleDelete(MovieCreditCRUDBaseURL);