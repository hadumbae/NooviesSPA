import {FC} from 'react';
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import GenreListCard from "@/pages/genres/components/cards/GenreListCard.tsx";

interface Props {
    genres: Genre[];
    onGenreDelete: () => void;
}

const GenreCardList: FC<Props> = ({genres, onGenreDelete}) => {
    return (
        genres.map((genre: Genre) => (<GenreListCard genre={genre} key={genre._id} onGenreDelete={onGenreDelete}/>))
    );
};

export default GenreCardList;
