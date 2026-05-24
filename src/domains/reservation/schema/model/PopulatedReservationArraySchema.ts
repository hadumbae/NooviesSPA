/**
 * @fileoverview Schema for collections of fully populated reservation records.
 */

import {generateArraySchema} from "@/common/_feat/validation-builders";
import {PopulatedReservationSchema} from "@/domains/reservation/schema/model/PopulatedReservationSchema.ts";
import {z} from "zod";

/** Validated array schema for populated reservation objects. */
export const PopulatedReservationArraySchema =
    generateArraySchema(PopulatedReservationSchema);

/** Inferred type for an array of populated reservations. */
export type PopulatedReservationArray = z.infer<typeof PopulatedReservationArraySchema>;