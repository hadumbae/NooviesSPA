import {z} from "zod";
import {MongooseSortOrderSchema} from "@/common/schema/enums/MongooseSortOrderSchema.ts";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";

/**
 * Zod schema defining sorting parameters for theatre queries.
 */
export const TheatreQueryMatchSortSchema = z.object({
    /** Sort by theatre name (ascending or descending). */
    sortByName: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),

    /** Sort by theatre seat capacity. */
    sortBySeatCapacity: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),

    /** Sort by city name. */
    sortByCity: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),

    /** Sort by state or province. */
    sortByState: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),

    /** Sort by country. */
    sortByCountry: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),

    /** Sort by postal code. */
    sortByPostCode: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),

    /** Sort by IANA timezone. */
    sortByTimezone: preprocessEmptyStringToUndefined(
        MongooseSortOrderSchema.optional()
    ),
});

/**
 * Inferred type for validated theatre match sort parameters.
 */
export type TheatreQueryMatchSorts = z.infer<typeof TheatreQueryMatchSortSchema>;