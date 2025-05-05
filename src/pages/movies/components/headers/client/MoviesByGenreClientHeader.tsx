import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

const MoviesByGenreClientHeader: FC = () => {
    return (
        <header>
            <HeaderTitle>Browse The Movies!</HeaderTitle>
            <HeaderDescription>From timeless classics to the latest releases — find them all here.</HeaderDescription>
        </header>
    );
};

export default MoviesByGenreClientHeader;
