import {FC} from 'react';
import {Genre} from "@/pages/genres/schema/GenreSchema.ts";
import GenreListCard from "@/pages/genres/components/GenreListCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

interface Props {
    genres: Genre[];
    onGenreDelete: () => void;
}

const GenreCardList: FC<Props> = ({genres, onGenreDelete}) => {
    if (genres.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no genres.</span>
        </PageCenter>;
    }

    return (
        genres.map(
            (genre: Genre) => (
                <GenreListCard
                    genre={genre}
                    key={genre._id}
                    onGenreDelete={onGenreDelete}
                />
            )
        )
    );
};

export default GenreCardList;
