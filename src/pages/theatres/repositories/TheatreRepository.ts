import { createRequestRepository } from "@/common/repositories/request-repository/RequestRepository.ts";

const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/theatres`;

/**
 * Repository for performing API requests related to **admin theatres**.
 *
 * Wraps {@link createRequestRepository} to target:
 * ```
 * /api/v1/admin/theatres
 * ```
 *
 * Provides standard methods:
 * - `getAll()`
 * - `get(id)`
 * - `create(data)`
 * - `update(id, data)`
 * - `delete(id)`
 * - `query(params)`
 *
 * @example
 * ```ts
 * import TheatreAdminRepository from "@/pages/theatres/repositories/TheatreAdminRepository";
 *
 * const { result } = await TheatreAdminRepository.getAll();
 * await TheatreAdminRepository.create({ name: "Grand Theatre" });
 * ```
 *
 * @see createRequestRepository
 */
const repository = createRequestRepository({ baseURL });

export default repository;
