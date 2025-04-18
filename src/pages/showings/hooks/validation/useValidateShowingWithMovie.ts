import {ShowingWithMovie, ShowingWithMovieSchema} from "@/pages/showings/schema/populated/ShowingWithMovieSchema.ts";
import {ParseError} from "@/common/errors/ParseError.ts";

export default function useValidateShowingWithMovie(data: any): ShowingWithMovie {
    const result = ShowingWithMovieSchema.safeParse(data);

    if (!result.success) {
        const message = "Invalid `Showing With Movie` Data. ";
        const errors = result.error.errors;

        throw new ParseError({message, errors});
    }

    return result.data;
}