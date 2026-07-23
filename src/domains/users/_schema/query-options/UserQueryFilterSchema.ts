/**
 * @fileoverview Defines the Zod schema and types for filtering user queries.
 */

import {z} from "zod";
import {preprocessOptionalField} from "@/common/_feat";
import {UserEmailSchema, UserPersonalNameSchema} from "@/domains/auth";
import {UserUniqueCodeSchema} from "@/domains/users";

/** Zod schema for validating user search and filter parameters. */
export const UserQueryFilterSchema = z.object({
    name: preprocessOptionalField(UserPersonalNameSchema),
    email: preprocessOptionalField(UserEmailSchema),
    uniqueCode: preprocessOptionalField(UserUniqueCodeSchema),
});

/** Type definition for user query filters derived from the schema. */
export type UserQueryFilters = z.infer<typeof UserQueryFilterSchema>;