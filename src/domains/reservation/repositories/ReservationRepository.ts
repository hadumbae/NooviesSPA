/**
 * @file ReservationRepository.ts
 *
 * Admin reservation API repository.
 *
 * Responsibilities:
 * - Define reservation admin base URL
 * - Create a typed request repository instance
 * - Expose standardized CRUD-style request helpers
 *
 * @remarks
 * Base URL:
 * `${VITE_API_URL}/api/v1/admin/reservations`
 *
 * Intended for:
 * - Admin-facing reservation management
 * - Reservation lookup, updates, lifecycle actions
 *
 * Built on top of the shared `createRequestRepository` factory
 * to ensure consistent request behavior across the application.
 */

import { createRequestRepository } from "@/common/repositories/request-repository/RequestRepository.ts";

/**
 * Base endpoint for admin reservation routes.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/reservations`;

/**
 * Reservation request repository instance.
 */
const repository = createRequestRepository({ baseURL });

export {
    repository as ReservationRepository
};
