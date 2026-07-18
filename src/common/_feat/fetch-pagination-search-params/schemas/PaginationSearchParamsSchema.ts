/**
 * @fileoverview Zod schema and type definitions for pagination search parameters.
 */

import {z} from "zod";
import {preprocessOptionalField} from "@/common/_feat/validation-preprocessors";
import {CoercedPositiveIntegerSchema} from "@/common/_schemas";

/** Zod schema for validating pagination search parameters. */
export const PaginationSearchParamsSchema = z.object({
    page: preprocessOptionalField(z.lazy(() => CoercedPositiveIntegerSchema)),
    perPage: preprocessOptionalField(z.lazy(() => CoercedPositiveIntegerSchema)),
});

/** Type definition for pagination search parameters. */
export type PaginationSearchParams = z.infer<typeof PaginationSearchParamsSchema>;