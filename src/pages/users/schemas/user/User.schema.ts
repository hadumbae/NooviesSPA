/**
 * @file User entity schemas.
 * User.schema.ts
 */

import { z } from "zod";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import { EmailStringSchema } from "@/common/schema/strings/EmailStringSchema.ts";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { UserRoleEnumSchema } from "@/pages/users/schemas/enums/UserRoleEnum.ts";

/**
 * Minimal user shape.
 */
export const LeanUserSchema = z.object({
    name: NonEmptyStringSchema,
});

/**
 * Full user entity schema.
 */
export const UserSchema = LeanUserSchema.extend({
    _id: IDStringSchema,
    email: EmailStringSchema,
    roles: generateArraySchema(UserRoleEnumSchema)
        .min(1, { message: "Must not be an empty array." }),
});