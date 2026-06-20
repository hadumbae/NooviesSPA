/**
 * @fileoverview Repository for Person CRUD operations using standardized handlers.
 */


import {
    handleCreate,
    handleDelete,
    handleFind,
    handleFindByID,
    handleFindBySlug,
    handlePaginated,
    handleQuery,
    handleUpdate
} from "@/common/_feat/crud-handlers";
import {PersonCRUDBaseURL} from "@/domains/persons/_feat/crud/baseURL.ts";

/** Retrieves all Person records without pagination (use with caution for large datasets). */
export const find = handleFind(PersonCRUDBaseURL);

/** Retrieves a single Person record by its unique database identifier. */
export const findByID = handleFindByID(PersonCRUDBaseURL);

/** Retrieves a single Person record by its URL slug. */
export const findBySlug = handleFindBySlug(PersonCRUDBaseURL);

/** Retrieves a paginated list of Person records for administrative tables. */
export const paginated = handlePaginated(PersonCRUDBaseURL);

/** Executes a filtered search against the Person collection. */
export const query = handleQuery(PersonCRUDBaseURL);

/** persists a new Person entity to the database. */
export const create = handleCreate(PersonCRUDBaseURL);

/** Updates an existing Person entity based on its ID and provided partial data. */
export const update = handleUpdate(PersonCRUDBaseURL);

/** Performs a hard delete of a Person record from the system. */
export const destroy = handleDelete(PersonCRUDBaseURL);