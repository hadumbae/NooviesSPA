/**
 * @fileoverview Zod schema and type definition for base reservation query filters.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas";
import {preprocessOptionalField} from "@/common/_feat/validation-preprocessors";
import {StringValueSchema} from "@/common/_schemas";
import {ReservationStatusEnumSchema, ReservationTypeEnumSchema} from "@/domains/reservations";

/** Zod schema for validating base reservation query filter parameters. */
export const ReservationBaseQueryFilterSchema = z.object({
    userID: preprocessOptionalField(IDStringSchema),
    showingID: preprocessOptionalField(IDStringSchema),
    uniqueCode: preprocessOptionalField(StringValueSchema),
    status: preprocessOptionalField(ReservationStatusEnumSchema),
    reservationType: preprocessOptionalField(ReservationTypeEnumSchema),
});

/** Type representing the base reservation query filter parameters. */
export type ReservationBaseQueryFilters = z.infer<typeof ReservationBaseQueryFilterSchema>;