import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";

const MovieIndexHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Movies</HeaderTitle>
                <HeaderDescription></HeaderDescription>
            </div>

            <HeaderLink to="/admin/movies/create">
                <Plus />
            </HeaderLink>
        </header>
    );
};

export default MovieIndexHeader;
