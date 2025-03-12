import { FC } from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";

const PersonCreateHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center",
        )}>
            <section>
                <HeaderTitle>Create Person</HeaderTitle>
                <HeaderDescription>
                    Record people here. Fill in the details and click on `Submit` to continue.
                </HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/persons">
                    <TableOfContents /> Index
                </HeaderLink>
            </section>
        </header>
    );
};

export default PersonCreateHeader;
