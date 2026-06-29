/**
 * @fileoverview Defines the Zod schema and TypeScript type for SeatMap status values.
 */

import {z} from "zod";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers";
import {SeatMapStatusConstant} from "@/domains/seatmaps/_schema/fields/SeatMapStatusConstant.ts";

/** Zod schema for validating SeatMap status strings against predefined constants. */
export const SeatMapStatusSchema = z.enum(
    SeatMapStatusConstant,
    ZodEnumParamHandler(),
);

/** TypeScript type representing all valid SeatMap status values. */
export type SeatMapStatus = z.infer<typeof SeatMapStatusSchema>;
