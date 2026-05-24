/**
 * @fileoverview Zod schema and TypeScript type for validating seat types.
 */

import { z } from "zod";
import {SeatTypeConstant} from "./SeatTypeConstant.ts";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers";

/** Zod schema for validating seat types. */
export const SeatTypeSchema = z.enum(SeatTypeConstant, ZodEnumParamHandler());

/** TypeScript type representing a valid seat type. */
export type SeatType = z.infer<typeof SeatTypeSchema>;