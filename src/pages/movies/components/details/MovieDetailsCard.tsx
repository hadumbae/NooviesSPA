import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import DetailsCardSpan from "@/common/components/text/DetailsCardSpan.tsx";
import {format} from "date-fns";
import formatDuration from "@/common/utility/formatDuration.ts";

interface Props {
    movie: Movie;
}

const MovieDetailsCard: FC<Props> = ({movie}) => {
    const {
        releaseDate,
        runtime,
        languages,
        subtitles,
        trailerURL,
    } = movie;

    const formattedDate = format(releaseDate, "dd MMM, yyyy");
    const movieDuration = formatDuration(runtime);
    const languageString = languages.join(", ");
    const subtitleString = subtitles.join(", ");

    return (
        <Card>
            <CardContent className="p-4 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                    <DetailsCardSpan label="Release Date" text={formattedDate} />
                    <DetailsCardSpan label="Duration" text={movieDuration} />
                    <DetailsCardSpan label="Trailer" text={trailerURL ? "Link" : "None"} to={trailerURL} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <DetailsCardSpan label="Languages" text={languageString} />
                    <DetailsCardSpan label="Subtitles" text={subtitleString} />
                </div>
            </CardContent>
        </Card>
    );
};

export default MovieDetailsCard;
