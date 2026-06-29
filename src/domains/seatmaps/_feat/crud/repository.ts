/**
 * @fileoverview Repository for seat map data access and persistence operations.
 */

import {
    handleCreate,
    handleDelete,
    handleFind,
    handleFindByID,
    handlePaginated,
    handleQuery,
    handleUpdate
} from "@/common/_feat/crud-handlers";
import {SeatMapCRUDBaseURL} from "@/domains/seatmaps/_feat/crud/baseURL.ts";

/** Fetches all seat map records. */
export const find = handleFind(SeatMapCRUDBaseURL);

/** Retrieves a specific seat map by its unique identifier. */
export const findByID = handleFindByID(SeatMapCRUDBaseURL);

/** Fetches a paginated list of seat map records. */
export const paginated = handlePaginated(SeatMapCRUDBaseURL);

/** Executes a filtered query for seat map records. */
export const query = handleQuery(SeatMapCRUDBaseURL);

/** Persists a new seat map record. */
export const create = handleCreate(SeatMapCRUDBaseURL);

/** Updates an existing seat map record. */
export const update = handleUpdate(SeatMapCRUDBaseURL);

/** Removes a seat map record from the system. */
export const destroy = handleDelete(SeatMapCRUDBaseURL);