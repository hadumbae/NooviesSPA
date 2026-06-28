/**
 * @fileoverview Zod schema and TypeScript type for Showing match filters.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {ShowingStatusSchema} from "@/domains/showings/_schema/fields/ShowingStatusSchema";

/** Zod schema for validating match-based filter criteria for Showings. */
export const ShowingQueryMatchFilterSchema = z.object({
    movie: IDStringSchema.optional(),
    theatre: IDStringSchema.optional(),
    screen: IDStringSchema.optional(),
    startTime: DateOnlyStringSchema.optional(),
    endTime: DateOnlyStringSchema.optional(),
    ticketPrice: PositiveNumberSchema.optional(),
    isSpecialEvent: CoercedBooleanValueSchema.optional(),
    isActive: CoercedBooleanValueSchema.optional(),
    status: ShowingStatusSchema.optional(),
});

/** Match-based filter criteria for querying Showings. */
export type ShowingQueryMatchFilters =
    z.infer<typeof ShowingQueryMatchFilterSchema>;