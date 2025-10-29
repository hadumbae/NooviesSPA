import { z } from "zod";
import { CleanedPositiveNumberSchema } from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";

/** Default page number from environment variables. */
const DEFAULT_PAGE = import.meta.env.VITE_PAGINATION_PAGE_DEFAULT;

/** Default number of items per page from environment variables. */
const DEFAULT_PER_PAGE = import.meta.env.VITE_PAGINATION_PER_PAGE_DEFAULT;

/**
 * Zod schema for pagination query parameters with defaults applied.
 *
 * @remarks
 * - `page` — Optional positive number representing the current page.
 *   Defaults to `defaultPage` from environment variables if not provided.
 * - `perPage` — Optional positive number representing items per page.
 *   Defaults to `defaultPerPage` from environment variables if not provided.
 *
 * This schema is typically used to validate and sanitize pagination-related
 * query parameters in API endpoints or React hooks.
 */
export const PaginationSearchParamSchema = z.object({
    /** The current page number (must be positive if provided). Defaults to `defaultPage`. */
    page: CleanedPositiveNumberSchema.optional().default(DEFAULT_PAGE),

    /** Number of items per page (must be positive if provided). Defaults to `defaultPerPage`. */
    perPage: CleanedPositiveNumberSchema.optional().default(DEFAULT_PER_PAGE),
});
