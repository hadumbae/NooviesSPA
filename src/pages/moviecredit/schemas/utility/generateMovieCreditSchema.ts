import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {PositiveNumberSchema} from "@/common/schema/numbers/PositiveNumberSchema.ts";
import {MovieCreditBaseSchema} from "@/pages/moviecredit/schemas/model/base/MovieCreditBaseSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {MovieSchema} from "@/pages/movies/schema/model/MovieSchema.ts";
import {PersonSchema} from "@/pages/persons/schema/PersonSchema.ts";

type GenerateParams = {
    type: "id" | "populated" | "virtuals";
}

export default function generateMovieCreditSchema({type}: GenerateParams) {
    const movieSchema = {id: IDStringSchema, populated: z.lazy(() => MovieSchema), virtuals: IDStringSchema};
    const personSchema = {id: IDStringSchema, populated: z.lazy(() => PersonSchema), virtuals: z.lazy(() => PersonSchema)};

    const baseValues = MovieCreditBaseSchema.extend({
        _id: IDStringSchema.readonly(),
        movie: movieSchema[type],
        person: personSchema[type],
    });

    const crewValues = baseValues.extend({
        roleType: z.literal("CREW"),
        job: NonEmptyStringSchema,
    }).omit({characterName: true, billingOrder: true});

    const castValues = baseValues.extend({
        roleType: z.literal("CAST"),
        characterName: NonEmptyStringSchema,
        billingOrder: PositiveNumberSchema,
    }).omit({job: true});

    return z.discriminatedUnion("roleType", [crewValues, castValues]);
}