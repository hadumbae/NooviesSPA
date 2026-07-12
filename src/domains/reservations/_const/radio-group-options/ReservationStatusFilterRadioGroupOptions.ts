/**
 * @fileoverview Options for the reservation status filter radio group.
 */

import HookRadioOption from "@/common/type/input/HookRadioOption.ts";

/** Radio group options for filtering reservations by their status. */
export const ReservationStatusFilterRadioGroupOptions: HookRadioOption[] = [
    {label: "All", value: ""},
    {label: "Reserved", value: "RESERVED"},
    {label: "Paid", value: "PAID"},
    {label: "Cancelled", value: "CANCELLED"},
    {label: "Refunded", value: "REFUNDED"},
    {label: "Expired", value: "EXPIRED"},
];