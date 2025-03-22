import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";
import {TableOfContents} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

const SeatCreateHeader: FC = () => {
    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>Create Seat</HeaderTitle>
                <HeaderDescription>Enter details and press on `Submit` to create seats.</HeaderDescription>
            </section>

            <section className="flex justify-end items-center">
                <HeaderLink variant="link" to="/admin/seats">
                    <TableOfContents/> Index
                </HeaderLink>
            </section>
        </header>
    );
};

export default SeatCreateHeader;
