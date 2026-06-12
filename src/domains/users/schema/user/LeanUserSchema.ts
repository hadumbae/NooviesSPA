/**
 * @fileoverview Defines the schema and type for a lightweight user representation.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema";
import {UserUniqueCodeSchema} from "@/domains/users/schema/fields/UserUniqueCodeSchema";

/** Zod schema for identifying a user with minimal metadata. */
export const LeanUserSchema = z.object({
    _id: IDStringSchema,
    name: NonEmptyStringSchema,
    uniqueCode: UserUniqueCodeSchema,
});

/** Lightweight user representation for identification. */
export type LeanUser = z.infer<typeof LeanUserSchema>;