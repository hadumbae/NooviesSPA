import {ParseError} from "@/common/errors/ParseError.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";

export default function useValidateShowingWithMovie(data: any): ShowingDetails {
    const result = ShowingDetailsSchema.safeParse(data);

    if (!result.success) {
        const message = "Invalid `Showing With Movie` Data. ";
        const errors = result.error.errors;

        throw new ParseError({message, errors});
    }

    return result.data;
}