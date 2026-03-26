/**
 * @file Query key factory for administrative reservation lookups by code.
 * @filename FetchByCodeQueryKeys.ts
 */

import {ReservationUniqueCode} from "@/domains/reservation/schema/model";

/**
 * Criteria for identifying specific reservation fetch queries.
 */
type FetchByCodeParams = {
    /** The unique ticket code to include in the query key. */
    code?: ReservationUniqueCode;
}

/**
 * Hierarchical query keys for the FetchByCode feature set.
 */
const FetchByCodeQueryKeys = {
    /** Global key for all reservation code queries. */
    all: ["reservations", "fetch", "by-code"],

    /** Generates a unique key for a specific reservation lookup. */
    fetchByCode: (params: FetchByCodeParams = {}) => [...FetchByCodeQueryKeys.all, "unique", params],
};