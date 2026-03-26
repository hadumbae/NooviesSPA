/**
 * @file TypeScript type definitions inferred from User Zod schemas.
 * @filename User.types.ts
 */

import {z} from "zod";
import {LeanUserSchema, LeanUserWithEmailSchema, UserSchema} from "@/domains/users/schemas/user/User.schema.ts";

/**
 * Lightweight user representation.
 */
export type LeanUser = z.infer<typeof LeanUserSchema>;

/**
 * Lean user profile including contact information.
 */
export type LeanUserWithEmail = z.infer<typeof LeanUserWithEmailSchema>;

/**
 * Fully validated User entity.
 */
export type User = z.infer<typeof UserSchema>;