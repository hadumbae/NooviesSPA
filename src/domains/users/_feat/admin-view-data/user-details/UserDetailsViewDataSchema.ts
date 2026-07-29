/**
 * @fileoverview Defines the schema and type for the user details administrative view data.
 */

import {z} from "zod";
import {UserSchema} from "@/domains/users/_schema";
import {NonNegativeIntegerSchema} from "@/common/_schemas";

/** Zod schema for validating the composite user details view data. */
export const UserDetailsViewDataSchema = z.object({
    user: UserSchema,
    totalReviews: NonNegativeIntegerSchema,
    totalReservations: NonNegativeIntegerSchema,
});

/** Type definition inferred from UserDetailsViewDataSchema. */
export type UserDetailsViewData = z.infer<typeof UserDetailsViewDataSchema>;