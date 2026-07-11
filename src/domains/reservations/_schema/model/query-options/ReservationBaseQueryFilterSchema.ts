/**
 * @fileoverview Zod schema and type definition for base reservation query filters.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {StringValueSchema} from "@/common/_schemas";
import {ReservationStatusEnumSchema, ReservationTypeEnumSchema} from "@/domains/reservations";

/** Zod schema for validating base reservation query filter parameters. */
export const ReservationBaseQueryFilterSchema = z.object({
    userID: IDStringSchema.optional(),
    showingID: IDStringSchema.optional(),
    uniqueCode: preprocessEmptyStringToUndefined(StringValueSchema),
    status: ReservationStatusEnumSchema.optional(),
    type: ReservationTypeEnumSchema.optional(),
});

/** Type representing the base reservation query filter parameters. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;