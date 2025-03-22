import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {Plus} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

const ShowingIndexHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "justify-between items-center"
        )}>
            <section>
                <HeaderTitle>Showings</HeaderTitle>
                <HeaderDescription>The showings of movies at theatres.</HeaderDescription>
            </section>

            <HeaderLink variant="link" to="/admin/showings/create">
                <Plus /> Create
            </HeaderLink>
        </header>
    );
};

export default ShowingIndexHeader;
