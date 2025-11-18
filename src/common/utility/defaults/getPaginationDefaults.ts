import Logger from "@/common/utility/features/logger/Logger.ts";
import {
    PaginationValues,
    PaginationValuesSchema
} from "@/common/schema/features/pagination-search-params/PaginationValuesSchema.ts";

/**
 * Retrieves and validates default pagination values from environment variables.
 *
 * ## Overview
 * This function reads pagination-related environment variables and ensures they are valid positive numbers.
 * It can be used to provide default pagination settings across the application, such as for API requests
 * or UI components implementing pagination.
 *
 * ## Behavior
 * - Reads `VITE_PAGINATION_PAGE_DEFAULT` and `VITE_PAGINATION_PER_PAGE_DEFAULT` from `import.meta.env`.
 * - Validates these values against {@link PaginationValuesSchema}.
 * - If validation fails:
 *   - Logs a detailed error via {@link Logger}, including the raw values and Zod validation errors.
 *   - Throws a runtime `Error` to prevent usage of invalid defaults.
 * - If validation succeeds, returns the validated pagination defaults.
 *
 * ## Usage Example
 * ```ts
 * import getPaginationDefaults from "@/common/utility/features/pagination/getPaginationDefaults";
 *
 * const defaults = getPaginationDefaults();
 * console.log(defaults.page, defaults.perPage);
 * ```
 *
 * @returns An object containing:
 * - `page` – Default page number for pagination.
 * - `perPage` – Default number of items per page.
 *
 * @throws {Error} If the environment variables are invalid or cannot be parsed as positive numbers.
 *
 * @remarks
 * - Ensure that `.env` contains valid numeric values for `VITE_PAGINATION_PAGE_DEFAULT` and
 *   `VITE_PAGINATION_PER_PAGE_DEFAULT`.
 * - This function is suitable for general use wherever default pagination values are required.
 */
export default function getPaginationDefaults(): PaginationValues {
    const raw = {
        page: import.meta.env.VITE_PAGINATION_PAGE_DEFAULT,
        perPage: import.meta.env.VITE_PAGINATION_PER_PAGE_DEFAULT,
    };

    const { data, success, error } = PaginationValuesSchema.safeParse(raw);

    if (!success || !data) {
        Logger.error({
            msg: "Invalid Pagination Defaults. Please check `.env` file.",
            type: "ERROR",
            error,
            context: { raw },
        });

        throw new Error("Invalid pagination defaults. Please check `.env` file.");
    }

    return data;
}
