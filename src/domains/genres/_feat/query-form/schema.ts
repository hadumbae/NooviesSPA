/**
 * @fileoverview Initial value validation schema for Genre query filter forms.
 * Used to define the shape of raw form state before processing or transformation.
 */

import {z} from "zod";
import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {MongooseNumericSortOrderSchema} from "@/common/schema/enums/MongooseNumericSortOrderSchema.ts";

/**
 * Validates the starting state of the Genre query option form.
 */
export const GenreQueryOptionFormStarterSchema = z.object({
    name: StringValueSchema.optional(),
    sortByName: z.union([MongooseNumericSortOrderSchema, StringValueSchema]).optional(),
});

/**
 * The raw value type for the Genre query option form initialization.
 */
export type GenreQueryOptionFormStarter = z.infer<typeof GenreQueryOptionFormStarterSchema>;