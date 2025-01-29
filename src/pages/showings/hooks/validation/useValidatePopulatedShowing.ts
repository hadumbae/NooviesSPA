import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {PopulatedShowing, ShowingPopulatedSchema} from "@/pages/showings/schema/ShowingPopulatedSchema.ts";
import {FetchError} from "@/common/errors/FetchError.ts";

export default function useValidatePopulatedShowing(showing: Showing): PopulatedShowing {
    const result = ShowingPopulatedSchema.safeParse(showing);

    if (!result.success) {
        throw new FetchError({
            message: "Invalid `Populated Showing` Data. ",
            errors: result.error.errors,
        });
    }

    return result.data;
}