/**
 * @file ReservationDetails.types.ts
 *
 * @summary
 * TypeScript types inferred from populated reservation schemas.
 *
 * @description
 * Provides strongly typed representations of populated reservation
 * entities derived from Zod schemas.
 *
 * Includes:
 * - A base populated reservation type without lifecycle refinement
 * - A fully populated reservation type with lifecycle constraints applied
 *
 * All types are inferred directly from their corresponding schemas to
 * ensure runtime and compile-time consistency.
 */

import {z} from "zod";
import {
    ReservationDetailsBaseSchema,
    ReservationDetailsSchema,
} from "@/pages/reservation/schema/model/reservation/ReservationDetails.schema.ts";

/**
 * Base populated reservation type.
 *
 * @remarks
 * Derived from {@link ReservationDetailsBaseSchema}.
 * Replaces identifier references with populated relations, but does not
 * guarantee lifecycle validity.
 */
export type ReservationDetailsBase = z.infer<typeof ReservationDetailsBaseSchema>;

/**
 * Fully populated and validated reservation type.
 *
 * @remarks
 * Derived from {@link ReservationDetailsSchema}.
 * Ensures populated relations and enforced lifecycle constraints based
 * on reservation status.
 */
export type ReservationDetails = z.infer<typeof ReservationDetailsSchema>;
