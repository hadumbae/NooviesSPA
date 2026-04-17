/**
 * @fileoverview Administrative repository for Person CRUD operations.
 * Leverages standardized higher-order CRUD handlers to provide a consistent
 * interface for managing Person entities in the admin dashboard.
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
} from "@/common/features/crud-handlers";
import {PersonCRUDBaseURL} from "@/domains/persons/_feat/crud/baseURL.ts";

/** Retrieves all Person records without pagination (use with caution for large datasets). */
export const find = handleFind(PersonCRUDBaseURL);

/** Retrieves a single Person record by its unique database ID. */
export const findByID = handleFindByID(PersonCRUDBaseURL);

/** Retrieves a single Person record by its SEO-friendly URL slug. */
export const findBySlug = handleFindBySlug(PersonCRUDBaseURL);

/** Retrieves a paginated list of Person records, typically used for administrative tables. */
export const paginated = handlePaginated(PersonCRUDBaseURL);

/** Executes a filtered search or complex query against the Person collection. */
export const query = handleQuery(PersonCRUDBaseURL);

/** persists a new Person entity to the database. */
export const create = handleCreate(PersonCRUDBaseURL);

/** Updates an existing Person entity based on its ID and provided partial data. */
export const update = handleUpdate(PersonCRUDBaseURL);

/** Performs a hard delete of a Person record from the system. */
export const destroy = handleDelete(PersonCRUDBaseURL);