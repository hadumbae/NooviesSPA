/**
 * @fileoverview Canonical reservation type literals used across schemas and domain logic.
 */

/** Array of supported reservation type strings used for schema definitions and branching. */
export const ReservationTypeConstant = [
    "GENERAL_ADMISSION",
    "RESERVED_SEATS",
] as const;