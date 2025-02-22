import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import {PopulatedShowing, ShowingPopulatedSchema} from "@/pages/showings/schema/ShowingPopulatedSchema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

interface Params {
    showing: Showing | null;
    isPending?: boolean;
}

export default function useValidatePopulatedShowing({showing, isPending}: Params): PopulatedShowing | null {
    if (!showing || isPending) return null;

    const result = ShowingPopulatedSchema.safeParse(showing);

    if (!result.success) {
        const message = "Invalid `Populated Showing` Data. ";
        const errors = result.error.errors;

        throw new ParseError({message, errors});
    }

    return result.data;
}