import { createRequestRepository } from "@/common/repositories/request-repository/RequestRepository.ts";

/**
 * A standardized HTTP request repository for seat-related administrative operations.
 *
 * Provides generic CRUD operations for `/api/v1/admin/seats` endpoints using
 * {@link createRequestRepository}. Methods include fetching all seats, paginated
 * queries, creating, updating, deleting, and custom queries.
 *
 * @example
 * ```ts
 * import SeatAdminRepository from "@/pages/seats/repositories/SeatAdminRepository.ts";
 *
 * // Fetch all seats
 * const { result } = await SeatAdminRepository.getAll({ populate: true });
 *
 * // Create a new seat
 * await SeatAdminRepository.create({ data: { row: "A", seatNumber: 1 } });
 * ```
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/seats`;
const repository = createRequestRepository({ baseURL });

export default repository;
