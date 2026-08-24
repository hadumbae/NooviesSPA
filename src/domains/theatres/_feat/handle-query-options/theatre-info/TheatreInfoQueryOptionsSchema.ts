/**
 * @fileoverview Zod schema and type definitions for querying theatre info query options.
 */

import {z} from "zod";
import {DateOnlyStringSchema} from "@/common/_schemas";
import {preprocessOptionalField} from "@/common/_feat";
import {AnyValues} from "@/common/_types";

/** Schema for validating theatre info query options context. */
export const TheatreInfoQueryOptionsSchema = z.object({
    date: preprocessOptionalField(DateOnlyStringSchema),
});

/** Parsed query options type derived from TheatreInfoQueryOptionsContext. */
export type TheatreInfoQueryOptions = z.infer<typeof TheatreInfoQueryOptionsSchema>;

/** Form values type for theatre info query options. */
export type TheatreInfoQueryOptionsFormValues = AnyValues<TheatreInfoQueryOptions>;