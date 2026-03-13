/**
 * @file Display order for movie credit categories.
 * @filename CreditCategoryDisplayOrderConstant.ts
 */

import {RoleTypeCategory} from "@/pages/roletype/schema/enums/RoleTypeCategory.types.ts";

/**
 * Ordered list of credit categories used for UI display.
 */
const orderConstant: (RoleTypeCategory | "Cast")[] = [
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

export {
    orderConstant as CreditCategoryDisplayOrderConstant
}