import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

const ScreenCreateHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>Create Screen</HeaderTitle>
                <HeaderDescription>Enter details and press on `Submit` to create screens.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/screens">
                    <TableOfContents/> Index
                </HeaderLink>
            </section>
        </header>
    );
};

export default ScreenCreateHeader;
