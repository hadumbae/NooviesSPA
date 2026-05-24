/**
 * @fileoverview Zod schema and TypeScript type for validating theatre screen formats.
 */

import {z} from "zod";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers";
import ScreenTypeConstant from "@/domains/theatre-screens/constants/ScreenTypeConstant.ts";

/** Zod schema for validating and restricting string values to known theatre screen types. */
export const ScreenTypeSchema = z.enum(ScreenTypeConstant, ZodEnumParamHandler());

/** TypeScript type representing a validated screen type format. */
export type ScreenType = z.infer<typeof ScreenTypeSchema>;