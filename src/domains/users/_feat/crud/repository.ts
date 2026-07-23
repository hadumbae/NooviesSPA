/**
 * @fileoverview Repository for user data access and persistence operations.
 */

import {handleDelete, handleFind, handleFindByID, handlePaginated} from "@/common/_feat";
import {UserCRUDBaseURL} from "@/domains/users/_feat/crud/baseURL.ts";

/** Fetches a paginated list of user records. */
export const find = handleFind(UserCRUDBaseURL);

/** Fetches a paginated response for user records. */
export const paginated = handlePaginated(UserCRUDBaseURL);

/** Retrieves a specific user record by its unique identifier. */
export const findByID = handleFindByID(UserCRUDBaseURL);

/** Deletes a user record from the system. */
export const destroy = handleDelete(UserCRUDBaseURL);
