/**
 * @fileoverview Defines radio group options for filtering reservations by type.
 */

import HookRadioOption from "@/common/type/input/HookRadioOption.ts";
import {ReservationTypeConstant} from "@/domains/reservations";

/** Radio group options for filtering reservations by their admission type. */
export const ReservationTypeFilterRadioGroupOptions: HookRadioOption[] = [
    {label: "All", value: ""},
    {label: "General Admission", value: ReservationTypeConstant[0]},
    {label: "Reserved Seats", value: ReservationTypeConstant[1]},
];