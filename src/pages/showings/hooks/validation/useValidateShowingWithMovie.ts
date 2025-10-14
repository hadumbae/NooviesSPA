import {ParseError} from "@/common/errors/ParseError.ts";
import {ShowingDetailsSchema} from "@/pages/showings/schema/showing/Showing.schema.ts";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";

export default function useValidateShowingWithMovie(data: any): ShowingDetails {
    const result = ShowingDetailsSchema.safeParse(data);

    if (!result.success) {
        const message = "Invalid `Showing With Movie` Data. ";
        const errors = result.error.errors;

        throw new ParseError({message, errors});
    }

    return result.data;
}