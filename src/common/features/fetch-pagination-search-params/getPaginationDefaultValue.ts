/**
 * @file Utility for retrieving and validating specific pagination environment variables.
 * @filename getPaginationDefaultValue.ts
 */

import {CleanedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import Logger from "@/common/utility/features/logger/Logger.ts";

/**
 * Static cache of raw pagination values sourced from the Vite environment.
 */
const RAW_DEFAULTS = {
    page: import.meta.env.VITE_PAGINATION_PAGE_DEFAULT,
    perPage: import.meta.env.VITE_PAGINATION_PER_PAGE_DEFAULT,
};

/**
 * Retrieves a validated numeric default for a specific pagination key.
 * @param key - The specific pagination property to retrieve ('page' or 'perPage').
 * @returns The validated numeric value for the requested key.
 * @throws {Error} If the environment variable fails validation.
 */
export function getPaginationDefaultValue(key: "page" | "perPage"): number {
    const rawValue = RAW_DEFAULTS[key];

    const {data, success, error} = CleanedNonNegativeNumberSchema.safeParse(rawValue);

    if (!success) {
        Logger.error({
            msg: "Invalid Pagination Default. Please check `.env` file.",
            type: "ERROR",
            error,
            context: {
                raw: rawValue,
                key,
            },
        });

        throw new Error("Invalid pagination defaults. Please check `.env` file.");
    }

    return data;
}