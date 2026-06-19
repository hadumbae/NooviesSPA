/**
 * @fileoverview Frontend repository for Genre-related CRUD operations.
 * Centralizes network request logic for the Genre domain by instantiating
 * standardized handlers with the domain-specific base URL.
 */

import {
    handleCreate,
    handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handleUpdate
} from "@/common/_feat/crud-handlers";
import {handlePaginated} from "@/common/_feat/crud-handlers/handlePaginated.ts";
import {handleQuery} from "@/common/_feat/crud-handlers/handleQuery.ts";
import {GenreCRUDBaseURL} from "@/domains/genres/_feat/crud/baseURL.ts";

/** Standard bulk retrieval of Genre documents. */
export const find = handleFind(GenreCRUDBaseURL);

/** Retrieval of a single Genre document by its unique ID. */
export const findByID = handleFindByID(GenreCRUDBaseURL);

/** Retrieval of a single Genre document by its slug. */
export const findBySlug = handleFindBySlug(GenreCRUDBaseURL);

/** Paginated retrieval of Genre documents with facet support. */
export const paginated = handlePaginated(GenreCRUDBaseURL);

/** Advanced aggregation queries for complex filtering and sorting. */
export const query = handleQuery(GenreCRUDBaseURL);

/** Creates a new Genre document. */
export const create = handleCreate(GenreCRUDBaseURL);

/** Updates an existing Genre document. */
export const update = handleUpdate(GenreCRUDBaseURL);

/** Deletion of a specific Genre document. */
export const destroy = handleDelete(GenreCRUDBaseURL);