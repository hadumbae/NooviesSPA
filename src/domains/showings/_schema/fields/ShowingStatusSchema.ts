/**
 * @fileoverview Zod schema and TypeScript type for the showing status enumeration.
 */

import { z } from "zod";
import {ShowingStatusConstant} from "@/domains/showings/_schema/fields/ShowingStatusConstant";

/**
 * Zod schema for validating a showing's status.
 */
export const ShowingStatusSchema = z.enum(ShowingStatusConstant, {
    message: "Invalid status code.",
});

/**
 * TypeScript type representing a valid showing status.
 */
export type ShowingStatus = z.infer<typeof ShowingStatusSchema>;