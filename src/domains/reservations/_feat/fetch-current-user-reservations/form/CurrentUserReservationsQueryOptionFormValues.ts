/**
 * @fileoverview Form values type definition for current user reservation query options.
 */

import {AnyValues} from "@/common/_types";
import {CurrentUserReservationsQueryOptions} from "@/domains/reservations/_feat/fetch-current-user-reservations/schema";

/** Form values for the current user reservations query options. */
export type CurrentUserReservationsQueryOptionFormValues = AnyValues<CurrentUserReservationsQueryOptions>;