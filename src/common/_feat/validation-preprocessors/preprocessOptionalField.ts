/**
 * @fileoverview Utility for preprocessing optional Zod fields by converting empty strings to undefined.
 */

import {ZodTypeAny} from "zod";
import {
    preprocessEmptyToUndefined
} from "@/common/_feat/validation-preprocessors/preprocessEmptyToUndefined.ts";

/** Wraps a Zod schema to treat empty strings as undefined and marks the field as optional. */
export function preprocessOptionalField<TSchema extends ZodTypeAny = ZodTypeAny>(schema: TSchema) {
    return preprocessEmptyToUndefined(schema.optional()).optional();
}