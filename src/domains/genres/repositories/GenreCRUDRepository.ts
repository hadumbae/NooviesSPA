/**
 * @file Frontend repository for Genre-related CRUD operations.
 * @filename GenreCRUDRepository.ts
 */

import {handleFind} from "@/common/features/crud-handlers";
import {GenreQueryOptions} from "@/domains/genres/schema/filters/GenreQueryOptions.types.ts";
import {handlePaginated} from "@/common/features/crud-handlers/handlePaginated.ts";

/**
 * Root endpoint for the Genre administrative API.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/genres/crud`;

/**
 * Standardized search handler for the Genre domain.
 * ---
 * @param params - Search criteria and request configuration (limit, page, etc.).
 * @returns A promise resolving to a standardized API response containing genre entities.
 */
export const find = handleFind<GenreQueryOptions>(baseURL);

export const paginated = handlePaginated<GenreQueryOptions>(baseURL);
