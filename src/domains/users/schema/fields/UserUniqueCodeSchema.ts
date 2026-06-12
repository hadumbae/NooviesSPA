/**
 * @fileoverview Zod schema and type for standardized user identification codes.
 */

import {StringValueSchema} from "@/common/schema/strings/simple-strings/StringValueSchema.ts";
import {z} from "zod";

/** Validation schema for unique user identification codes. */
export const UserUniqueCodeSchema = StringValueSchema.regex(
    /^USR-[A-Z0-9]{5}-[A-Z0-9]{5}$/,
    {message: "Invalid format. Expected USR-XXXXX-XXXXX (e.g., USR-K9P2W-LM4X1)"},
);

/** Represents the validated string format for a user's unique system code. */
export type UserUniqueCode = z.infer<typeof UserUniqueCodeSchema>;