/**
 * @fileoverview Base query key definitions for the showings domain.
 */

/** Centralized query keys for showings CRUD operations and specialized views. */
export const ShowingBaseQueryKeys: Record<string, string[]> = {
    crud: ["showings", "crud"],
    crudList: ["showings", "crud", "list"],
    views: ["showings", "views"],
}