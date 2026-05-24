/**
 * @fileoverview Defines the schema and type for the composite data required by the Showing Details admin view.
 */

import {z} from "zod";
import {ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import {MovieWithGenresSchema} from "@/domains/movies/schema/movie";
import {TheatreDetailsSchema} from "@/domains/theatres/schema/theatre";
import {TheatreScreenDetailsSchema} from "@/domains/theatre-screens/schema/model";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {SeatMapDetailsSchema} from "@/domains/seatmap/schema/model/SeatMap.schema.ts";

/** Zod schema for validating the aggregated showing details view data. */
export const ShowingDetailsViewDataSchema = z.object({
    showing: ShowingDetailsSchema,
    movie: MovieWithGenresSchema,
    theatre: TheatreDetailsSchema,
    screen: TheatreScreenDetailsSchema,
    seating: generateArraySchema(SeatMapDetailsSchema),
});

/** Type definition inferred from the ShowingDetailsViewDataSchema. */
export type ShowingDetailsViewData = z.infer<typeof ShowingDetailsViewDataSchema>;