import { createRequestRepository } from "@/common/repositories/RequestRepository.ts";

/**
 * Base URL for the Role Types API.
 *
 * This is composed of the `baseURL` defined in the project's environment
 * variables (`import.meta.env.baseURL`) and the API path for role types.
 */
const baseURL = `${import.meta.env.VITE_API_URL}/api/v1/admin/roletypes`;

/**
 * Repository instance for performing CRUD operations on **Role Types**.
 *
 * This repository is created using the generic {@link createRequestRepository},
 * which returns a standardized interface for interacting with the backend API.
 *
 * @remarks
 * - The repository typically provides methods like `get`, `list`, `create`,
 *   `update`, and `delete`.
 * - All requests are scoped to the `/api/v1/admin/roletypes` endpoint.
 *
 * @example
 * ```ts
 * // Fetch all role types
 * const roleTypes = await repository.all();
 *
 * // Get a role type by ID
 * const roleType = await repository.get("123");
 *
 * // Create a new role type
 * await repository.create({ name: "Manager" });
 * ```
 */
const repository = createRequestRepository({ baseURL });

export default repository;
