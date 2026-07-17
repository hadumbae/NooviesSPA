/**
 * @fileoverview Defines the schema and types for the genre query form.
 */

import {AnyValues} from "@/common/_types";
import {GenreQueryOptions} from "@/domains/genres/_schema";

/** Type representing the initial values for the genre query option form. */
export type GenreQueryOptionFormStarter = AnyValues<GenreQueryOptions>;