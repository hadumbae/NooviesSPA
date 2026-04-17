/**
 * @fileoverview Constant definition for the Person CRUD API base path.
 * Used by administrative interfaces to perform standard Create, Read, Update,
 * and Delete operations on Person entities.
 */

/**
 * The base URL for administrative CRUD operations related to Persons.
 */
export const PersonCRUDBaseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/persons/crud`;