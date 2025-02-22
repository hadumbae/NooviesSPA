import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {ChevronLeft} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

const GenreCreateHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>Create Genre</HeaderTitle>
                <HeaderDescription>
                    Define a new movie genre by providing its name and description. Click on `Submit` to continue.
                </HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/genres">
                    <ChevronLeft /> Index
                </HeaderLink>
            </section>

        </header>
    );
};

export default GenreCreateHeader;
