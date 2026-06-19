/**
 * @fileoverview Defines the schema and types for the genre query form.
 */

import {AnyValues} from "@/common/types";
import {GenreQueryOptions} from "@/domains/genres/schema";

/** Type representing the initial values for the genre query option form. */
export type GenreQueryOptionFormStarter = AnyValues<GenreQueryOptions>;