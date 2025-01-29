import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";

const MovieCreateHeader: FC = () => {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Create Movies</HeaderTitle>
                <HeaderDescription>Enter details and press on `Submit` to create movies.</HeaderDescription>
            </div>

            <HeaderLink to="/admin/movies">
                <TableOfContents />
            </HeaderLink>
        </header>
    );
};

export default MovieCreateHeader;
