/** @fileoverview Zod schema and type definitions for validated theatre form data. */


import {z} from "zod";
import {LocationFormSchema} from "@/common/_models/location-form/LocationFormSchema.ts";
import {IDStringSchema} from "@/common/_schemas";
import {AnyValues} from "@/common/_types";
import {TheatreNameSchema, TheatreSeatCapacitySchema} from "@/domains/theatres";

/** Schema for validating and cleaning theatre form submissions. */
export const TheatreFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    name: TheatreNameSchema,
    location: LocationFormSchema,
    seatCapacity: TheatreSeatCapacitySchema,
});

/** Validated and cleaned theatre form data inferred from the schema. */
export type TheatreFormData = z.infer<typeof TheatreFormSchema>;

/** Form values used to initialize the theatre creation or edit fields. */
export type TheatreFormValues = AnyValues<TheatreFormData>