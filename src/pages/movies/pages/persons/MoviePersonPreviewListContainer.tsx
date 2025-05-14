import {FC} from 'react';
import {Person} from "@/pages/persons/schema/PersonSchema.ts";
import MoviePersonPreviewCard from "@/pages/movies/pages/persons/MoviePersonPreviewCard.tsx";

interface ContainerProps {
    cast: Person[];
    staff: Person[];
}

const MoviePersonPreviewListContainer: FC<ContainerProps> = ({cast, staff}) => {
    return (
        <section className="space-y-5">
            <h1 className="sr-only">Casts & Staff</h1>

            <section className="space-y-1">
                <h1 className="font-bold">Staff</h1>

                <div className="grid grid-cols-2 gap-2">
                    {staff.map(
                        (person) => <MoviePersonPreviewCard key={person._id} person={person}/>
                    )}
                </div>
            </section>

            <section className="space-y-1">
                <h1 className="font-bold">Cast</h1>

                <div className="grid grid-cols-2 gap-2">
                    {cast.map(
                        (person) => <MoviePersonPreviewCard key={person._id} person={person}/>
                    )}
                </div>
            </section>
        </section>
    );
};

export default MoviePersonPreviewListContainer;
