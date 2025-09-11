import {FC} from 'react';
import MoviePersonPreviewCard from "@/pages/movies/pages/persons/MoviePersonPreviewCard.tsx";

import {MovieCredit} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";

interface ContainerProps {
    cast: MovieCredit[];
    crew: MovieCredit[];
}

const MoviePersonPreviewListContainer: FC<ContainerProps> = ({cast, crew}) => {
    // TODO Update Person To Movie Credit

    return (
        <section className="space-y-5">
            <h1 className="sr-only">Casts & Crew</h1>

            <section className="space-y-1">
                <h1 className="font-bold">Crew</h1>

                <div className="grid grid-cols-2 gap-2">
                    {crew.map((credit) => <MoviePersonPreviewCard key={credit._id} credit={credit}/>)}
                </div>
            </section>

            <section className="space-y-1">
                <h1 className="font-bold">Cast</h1>

                <div className="grid grid-cols-2 gap-2">
                    {cast.map((credit) => <MoviePersonPreviewCard key={credit._id} credit={credit}/>)}
                </div>
            </section>
        </section>
    );
};

export default MoviePersonPreviewListContainer;
