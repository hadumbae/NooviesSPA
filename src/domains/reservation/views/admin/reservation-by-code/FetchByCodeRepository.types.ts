/**
 * @file Type definitions for the FetchByCode repository.
 * @filename FetchByCodeRepository.types.ts
 */

/**
 * Input criteria for the reservation lookup request.
 */
export type GetFetchByCodeParams = {
    /** The unique reservation identifier (e.g., "RES-XXXXX-XXXXX"). */
    code: string;
}