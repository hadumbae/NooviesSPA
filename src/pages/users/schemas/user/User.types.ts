import { z } from "zod";
import { UserSchema } from "@/pages/users/schemas/user/User.schema.ts";

/**
 * @file User.types.ts
 *
 * @summary
 * TypeScript types derived from user Zod schemas.
 *
 * @description
 * Provides strongly typed TypeScript representations inferred from
 * {@link UserSchema}. These types should be used throughout the
 * application wherever user data is consumed to ensure consistency
 * with runtime validation rules.
 */

/**
 * Represents a validated user entity.
 *
 * @remarks
 * Inferred directly from {@link UserSchema}.
 */
export type User = z.infer<typeof UserSchema>;
