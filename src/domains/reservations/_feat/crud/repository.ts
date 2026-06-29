/**
 * @fileoverview Repository for reservation data access and persistence operations.
 */

import {ReservationCRUDBaseURL} from "@/domains/reservations/_feat/crud/baseURL.ts";
import {handleFindByID, handleFindBySlug} from "@/common/_feat/crud-handlers";

/** Finds a reservation by its unique ID. */
export const findByID = handleFindByID(ReservationCRUDBaseURL);

/** Finds a reservation by its slug identifier. */
export const findBySlug = handleFindBySlug(ReservationCRUDBaseURL);
