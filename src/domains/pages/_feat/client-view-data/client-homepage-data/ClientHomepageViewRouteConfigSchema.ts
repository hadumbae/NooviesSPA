/**
 * @fileoverview Zod schema and type definitions for client homepage view route query configurations.
 */

import {z} from "zod";
import {ISO3166Alpha2CountryCodeSchema, PositiveIntegerSchema} from "@/common/_schemas";

/** Zod schema for parsing and validating client homepage view query parameters with defaults. */
export const ClientHomepageViewRouteConfigSchema = z.object({
    country: ISO3166Alpha2CountryCodeSchema.optional().default("US").catch("US"),
    recentCount: PositiveIntegerSchema.optional().default(10).catch(10),
    genreCount: PositiveIntegerSchema.optional().default(5).catch(5),
    movieCount: PositiveIntegerSchema.optional().default(5).catch(5),
    theatreCount: PositiveIntegerSchema.optional().default(10).catch(10),
    upcomingCount: PositiveIntegerSchema.optional().default(10).catch(10),
    reservationCount: PositiveIntegerSchema.optional().default(10).catch(10),
});

/** Inferred type for validated client homepage view route configuration options. */
export type ClientHomepageViewRouteConfig = z.infer<typeof ClientHomepageViewRouteConfigSchema>;