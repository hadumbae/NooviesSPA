/**
 * @file Defines the canonical UI display order for movie credit categories.
 * @filename CreditCategoryDisplayOrderConstant.ts
 */

import { RoleTypeCategory } from "@/pages/roletype/schema/enums/RoleTypeCategory.types.ts";

/**
 * Canonical ordering used when rendering grouped credit sections in the UI.
 *
 * Includes the synthetic `"Cast"` category which is not part of
 * {@link RoleTypeCategory} but is displayed alongside crew categories.
 */
const CreditCategoryDisplayOrderConstant: readonly (RoleTypeCategory | "Cast")[] = [
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
 * Union type representing all categories that can appear in the
 * credit display ordering.
 */
export type CreditDisplayOrderCategory =
    typeof CreditCategoryDisplayOrderConstant[number];