import {FC} from 'react';
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import GenreOptions from "@/pages/genres/components/GenreOptions.tsx";
import {Link} from "react-router-dom";

interface Props {
    genre: Genre;
    onGenreDelete: () => void;
}

const GenreListCard: FC<Props> = ({genre, onGenreDelete}) => {
    const {_id, name} = genre;

    return (
        <Card>
            <CardContent className="p-4 flex justify-between items-center">
                <Link
                    className="text-md font-extrabold hover:underline"
                    to={`/admin/genres/get/${_id}`}
                >
                    {name}
                </Link>

                <GenreOptions
                    genre={genre}
                    onGenreDelete={onGenreDelete}
                />
            </CardContent>
        </Card>
    );
};

export default GenreListCard;
