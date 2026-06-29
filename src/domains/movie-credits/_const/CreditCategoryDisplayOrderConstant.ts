/**
 * @fileoverview Defines the canonical UI display order for movie credit categories.
 *
 */

import { RoleTypeCategory } from "@/domains/roletypes/_schema";

/**
 * Canonical ordering used when rendering grouped credit sections in the UI.
 */
export const CreditCategoryDisplayOrderConstant: readonly (RoleTypeCategory | "Cast")[] = [
    "Writer",
    "Director",
    "Cast",
    "Producer",
    "Casting",
    "Cinematography",
    "Art Department",
    "Costume & Wardrobe",
    "Makeup & Hair",
    "Production",
    "Camera & Electrical",
    "Stunts",
    "Special Effects",
    "Editing",
    "Visual Effects",
    "Post-Production",
    "Sound",
    "Music",
    "Other",
] as const;

/**
 * Union type of categories available in the credit display ordering.
 */
export type CreditDisplayOrderCategory = typeof CreditCategoryDisplayOrderConstant[number];