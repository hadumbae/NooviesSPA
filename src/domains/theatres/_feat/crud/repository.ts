/**
 * @fileoverview Frontend service layer for Theatre CRUD operations.
 * Utilizes generic higher-order handlers to interface with the Theatre administrative API.
 * * @remarks
 * While the internal comments currently reference "Genre," these handlers are
 * specifically bound to the {@link TheatreCRUDBaseURL} for cinema venue management.
 */

import {
    handleCreate,
    handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handleUpdate
} from "@/common/features/crud-handlers";
import {handlePaginated} from "@/common/features/crud-handlers/handlePaginated.ts";
import {handleQuery} from "@/common/features/crud-handlers/handleQuery.ts";
import {TheatreCRUDBaseURL} from "@/domains/theatres/_feat/crud/baseURL.ts";

/**
 * Standard retrieval of Theatre documents.
 */
export const find = handleFind(TheatreCRUDBaseURL);

/**
 * Retrieval of a single Theatre document by its unique MongoDB ObjectID.
 */
export const findByID = handleFindByID(TheatreCRUDBaseURL);

/**
 * Retrieval of a single Theatre document by its URL-safe slug.
 */
export const findBySlug = handleFindBySlug(TheatreCRUDBaseURL);

/**
 * Paginated retrieval of Theatre documents.
 */
export const paginated = handlePaginated(TheatreCRUDBaseURL);

/**
 * Advanced aggregation queries for Theatre data.
 */
export const query = handleQuery(TheatreCRUDBaseURL);

/**
 * Creation of a new Theatre record.
 */
export const create = handleCreate(TheatreCRUDBaseURL);

/**
 * Partial update of an existing Theatre document (e.g., changing name or location).
 */
export const update = handleUpdate(TheatreCRUDBaseURL);

/**
 * Deletion of a specific Theatre document.
 */
export const destroy = handleDelete(TheatreCRUDBaseURL);