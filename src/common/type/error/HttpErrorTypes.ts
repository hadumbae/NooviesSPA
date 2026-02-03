/**
 * @file HttpErrorTypes.ts
 *
 * Shared HTTP error–related type definitions.
 *
 * Provides lightweight utility types used to customize or enrich
 * HTTP error handling and messaging across the application.
 */

// e.g. {404: "Theatre not found."}
/**
 * Maps HTTP status codes to custom override messages.
 *
 * Intended for selectively replacing default server or client
 * error text with domain-specific, user-friendly messaging.
 *
 * @example
 * ```ts
 * const overrides: HttpStatusOverrideText = {
 *   404: "Theatre not found.",
 *   409: "Reservation already exists.",
 * };
 * ```
 */
export type HttpStatusOverrideText = Record<number, string>;
