import {createQueryOptionsContext} from "@/common/_feat";
import {MovieQueryOptionSchema} from "@/domains/movies";

const {Provider, useQueryOptionsContext} = createQueryOptionsContext({
    schema: MovieQueryOptionSchema,
    name: "MovieIndexQueryOptionsContext",
});

export {
    Provider as MovieIndexQueryOptionsContextProvider,
    useQueryOptionsContext as useMovieIndexQueryOptionsContext
}