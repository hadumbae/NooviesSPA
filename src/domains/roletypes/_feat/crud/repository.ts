/**
 * @fileoverview Repository for RoleType data access and persistence operations.
 */

import {
    handleCreate, handleDelete,
    handleFind,
    handleFindByID,
    handlePaginated,
    handleQuery,
    handleUpdate
} from "@/common/_feat/crud-handlers";
import {RoleTypeCRUDBaseURL} from "@/domains/roletypes/_feat";

/** Fetches all RoleType records. */
export const find = handleFind(RoleTypeCRUDBaseURL);
/** Fetches a single RoleType by its unique identifier. */
export const findByID = handleFindByID(RoleTypeCRUDBaseURL);
/** Fetches a paginated list of RoleType records. */
export const paginated = handlePaginated(RoleTypeCRUDBaseURL);
/** Executes a filtered query for RoleType records. */
export const query = handleQuery(RoleTypeCRUDBaseURL);
/** Creates a new RoleType record. */
export const create = handleCreate(RoleTypeCRUDBaseURL);
/** Updates an existing RoleType record. */
export const update = handleUpdate(RoleTypeCRUDBaseURL);
/** Deletes a RoleType record by its unique identifier. */
export const destroy = handleDelete(RoleTypeCRUDBaseURL);
