/**
 * @fileoverview Defines the schema and type for a lightweight user representation.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/_schemas/strings/id-strings/IDStringSchema";
import {UserUniqueCodeSchema} from "@/domains/users/_schema/fields/UserUniqueCodeSchema";
import {UserPersonalNameSchema} from "@/domains/auth";

/** Zod schema for identifying a user with minimal metadata. */
export const LeanUserSchema = z.object({
    _id: IDStringSchema,
    name: UserPersonalNameSchema,
    uniqueCode: UserUniqueCodeSchema,
});

/** Lightweight user representation for identification. */
export type LeanUser = z.infer<typeof LeanUserSchema>;