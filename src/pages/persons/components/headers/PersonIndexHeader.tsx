import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {cn} from "@/common/lib/utils.ts";

const PersonIndexHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>Persons</HeaderTitle>
                <HeaderDescription>The the actors and crew behind movies.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink
                    variant="link"
                    to="/admin/persons/create"
                    component={PersonIndexHeader.name}
                    message="Navigate to form for creating persons."
                >
                    <Plus/> Create
                </HeaderLink>
            </section>
        </header>
    );
};

export default PersonIndexHeader;
