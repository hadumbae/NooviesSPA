/**
 * @fileoverview Centralized environment variable access for API and client configuration.
 * Provides a type-safe way to access Vite-injected variables used across the
 * networking and routing layers.
 */

/**
 * The root URL for the backend API services.
 */
export const API_URL = import.meta.env.VITE_API_URL;

/**
 * The identifier for the current client application build.
 */
export const VIEW_CLIENT = import.meta.env.VITE_DEV_CLIENT_NAME;