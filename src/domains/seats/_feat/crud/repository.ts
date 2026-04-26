/**
 * @fileoverview CRUD operation handlers for theatre seat management.
 */

import {SeatCRUDBaseURL} from "@/domains/seats/_feat/crud/baseURL.ts";
import {
    handleCreate, handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
    handleQuery, handleUpdate
} from "@/common/features/crud-handlers";

/** Standard CRUD methods bound to the Seat administrative API. */
export const find = handleFind(SeatCRUDBaseURL);
export const findByID = handleFindByID(SeatCRUDBaseURL);
export const findBySlug = handleFindBySlug(SeatCRUDBaseURL);

export const paginated = handlePaginated(SeatCRUDBaseURL);
export const query = handleQuery(SeatCRUDBaseURL);

export const create = handleCreate(SeatCRUDBaseURL);
export const update = handleUpdate(SeatCRUDBaseURL);
export const destroy = handleDelete(SeatCRUDBaseURL);