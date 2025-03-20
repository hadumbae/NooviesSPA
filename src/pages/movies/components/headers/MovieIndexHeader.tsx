import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

const MovieIndexHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "justify-between items-center",
        )}>
            <section>
                <HeaderTitle>Movies</HeaderTitle>
                <HeaderDescription>Registered movies.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/movies/create">
                    <Plus /> Create
                </HeaderLink>
            </section>
        </header>
    );
};

export default MovieIndexHeader;
