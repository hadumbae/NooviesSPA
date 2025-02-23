import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";

const GenreIndexHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>Genres</HeaderTitle>
                <HeaderDescription>The genres of the movies.</HeaderDescription>
            </section>

            <HeaderLink variant="link" to="/admin/genres/create">
                <Plus/> Create
            </HeaderLink>
        </header>
    );
};

export default GenreIndexHeader;
