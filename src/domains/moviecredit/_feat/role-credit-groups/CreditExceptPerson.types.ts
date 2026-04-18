/**
 * @file Inferred types for partially populated movie credit schemas excluding person details.
 * @filename CreditExceptPerson.types.ts
 */

import {z} from "zod";
import {
    CastCreditExceptPersonSchema,
    CreditExceptPersonSchema,
    CrewCreditExceptPersonSchema
} from "@/domains/moviecredit/_feat/role-credit-groups/CreditExceptPerson.schema.ts";

/** Crew credit with populated relations excluding person details. */
export type CrewCreditExceptPerson = z.infer<typeof CrewCreditExceptPersonSchema>;

/** Cast credit with populated relations excluding person details. */
export type CastCreditExceptPerson = z.infer<typeof CastCreditExceptPersonSchema>;

/** Union type for partially populated credit details excluding person. */
export type CreditExceptPerson = z.infer<typeof CreditExceptPersonSchema>;