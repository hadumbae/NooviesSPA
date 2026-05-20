/**
 * @fileoverview Defines the allowed status values for a movie showing.
 */

/** Array of valid status strings for a showing. */
export const ShowingStatusConstant = [
    "SCHEDULED",
    "RUNNING",
    "COMPLETED",
    "CANCELLED",
    "SOLD_OUT"
] as const;
