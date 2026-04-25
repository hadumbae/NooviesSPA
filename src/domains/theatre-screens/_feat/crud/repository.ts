/**
 * @fileoverview Repository for Theatre Screen CRUD operations.
 * Maps standard API handlers to the Theatre Screen base URL.
 */

import {TheatreScreenCRUDBaseURL} from "@/domains/theatre-screens/_feat/crud/baseURL.ts";
import {
    handleCreate, handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
    handleQuery, handleUpdate
} from "@/common/features/crud-handlers";

/** Retrieves all theatre screen records. */
export const find = handleFind(TheatreScreenCRUDBaseURL);

/** Retrieves a specific theatre screen by its unique ID. */
export const findByID = handleFindByID(TheatreScreenCRUDBaseURL);

/** Retrieves a specific theatre screen by its slug. */
export const findBySlug = handleFindBySlug(TheatreScreenCRUDBaseURL);

/** Retrieves a paginated list of theatre screens. */
export const paginated = handlePaginated(TheatreScreenCRUDBaseURL);

/** Creates a new theatre screen record. */
export const create = handleCreate(TheatreScreenCRUDBaseURL);

/** Updates an existing theatre screen record. */
export const update = handleUpdate(TheatreScreenCRUDBaseURL);

/** Deletes a theatre screen record. */
export const destroy = handleDelete(TheatreScreenCRUDBaseURL);

/** Executes a filtered query on theatre screen records. */
export const query = handleQuery(TheatreScreenCRUDBaseURL);