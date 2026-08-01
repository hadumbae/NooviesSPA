/**
 * @fileoverview Defines the complete validation schema and type for the User entity.
 */

import {z} from "zod";
import {NonNegativeIntegerSchema} from "@/common/_schemas";
import {UserSchema} from "@/domains/users/_schema/user/UserSchema.ts";

/** Complete validation schema for the User entity including assigned roles. */
export const UserDetailsSchema = UserSchema.extend({
    reviewCount: NonNegativeIntegerSchema,
    reservationCount: NonNegativeIntegerSchema,
    activeReservationCount: NonNegativeIntegerSchema,
});

/** Fully validated User entity including roles. */
export type UserDetails = z.infer<typeof UserDetailsSchema>;