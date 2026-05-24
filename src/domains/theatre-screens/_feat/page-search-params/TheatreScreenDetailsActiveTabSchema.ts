/**
 * @fileoverview Zod enum defining the valid active tabs for the Screen Details admin page.
 */

import {z} from "zod";
import {ZodEnumParamHandler} from "@/common/_feat/validation-handlers";

/** Allowed Screen Details tab identifiers. */
export const TheatreScreenDetailsActiveTabSchema = z.enum(["showings", "seating"], ZodEnumParamHandler());

/** Inferred union type of valid screen detail tabs. */
export type TheatreScreenDetailsActiveTab = z.infer<typeof TheatreScreenDetailsActiveTabSchema>;