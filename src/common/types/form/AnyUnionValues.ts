/**
 * @fileoverview Utility type for form values derived from a discriminated union.
 */

import {UnionKeys} from "@/common/types/discriminated-union";

/** A utility type that creates an object with optional keys from all possible members of a discriminated union. */
export type AnyUnionValues<TValues> = { [K in UnionKeys<TValues>]?: any };