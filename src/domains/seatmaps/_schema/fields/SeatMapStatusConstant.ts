/**
 * @fileoverview Constant defining the valid status values for seats in a seat map.
 */

/**
 * A read-only list of all possible seat map statuses used in the system.
 */
export const SeatMapStatusConstant = [
    "UNAVAILABLE",
    "AVAILABLE",
    "RESERVED",
    "SOLD",
    "PENDING",
] as const;
