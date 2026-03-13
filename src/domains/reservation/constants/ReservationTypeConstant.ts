/**
 * @file ReservationTypeConstant.ts
 *
 * Canonical reservation type literals.
 *
 * Defines the supported reservation modes used
 * across schemas, validation, and domain logic.
 */

/**
 * Supported reservation types.
 *
 * @remarks
 * Used as a source of truth for:
 * - Zod and enum schema definitions
 * - Discriminated unions
 * - Reservation workflow branching
 */
const ReservationTypeConstant = [
    "GENERAL_ADMISSION",
    "RESERVED_SEATS",
] as const;

export {
    ReservationTypeConstant,
};
