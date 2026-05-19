/**
 * @fileoverview Repository for managing showing data through standardized CRUD operations.
 */

import {ShowingCRUDBaseURL} from "@/domains/showings/_feat/crud/baseURL.ts";
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

/** Retrieves all showing records. */
export const find = handleFind(ShowingCRUDBaseURL);

/** Retrieves a specific showing by its unique identifier. */
export const findByID = handleFindByID(ShowingCRUDBaseURL);

/** Retrieves a specific showing by its URL-friendly slug. */
export const findBySlug = handleFindBySlug(ShowingCRUDBaseURL);

/** Retrieves a paginated list of showing records. */
export const paginated = handlePaginated(ShowingCRUDBaseURL);

/** Executes a filtered query for showing records. */
export const query = handleQuery(ShowingCRUDBaseURL);

/** Persists a new showing record. */
export const create = handleCreate(ShowingCRUDBaseURL);

/** Updates an existing showing record. */
export const update = handleUpdate(ShowingCRUDBaseURL);

/** Removes a showing record from the system. */
export const destroy = handleDelete(ShowingCRUDBaseURL);