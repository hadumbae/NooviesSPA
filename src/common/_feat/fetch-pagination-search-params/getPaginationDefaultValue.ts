/**
 * @fileoverview Utility to retrieve and validate default pagination values from environment variables.
 */

import {Logger} from "@/common/_feat/logger/Logger.ts";
import {preprocessToNumber} from "@/common/_feat/validation-preprocessors";

import {CoercedPositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/CoercedPositiveNumberSchema";

const RAW_DEFAULTS = {
    page: import.meta.env.VITE_PAGINATION_PAGE_DEFAULT,
    perPage: import.meta.env.VITE_PAGINATION_PER_PAGE_DEFAULT,
};

/** Retrieves and validates a default pagination value for the specified key. */
export function getPaginationDefaultValue(key: "page" | "perPage"): number {
    const rawValue = RAW_DEFAULTS[key];

    const {data, success, error} = preprocessToNumber(CoercedPositiveNumberSchema).safeParse(rawValue);

    if (!success) {
        Logger.error({
            msg: "Invalid Pagination Default. Please check `.env` file.",
            context: {raw: rawValue, key},
            type: "ERROR",
            error,
        });

        throw new Error("Invalid pagination defaults. Please check `.env` file.");
    }

    return data;
}