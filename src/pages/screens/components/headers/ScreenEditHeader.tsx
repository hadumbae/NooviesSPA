import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Search, TableOfContents} from "lucide-react";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import HeaderLink from "@/common/components/page/headers/HeaderLink.tsx";

interface Props {
    screen: Screen;
}

const ScreenEditHeader: FC<Props> = ({screen}) => {
    const {_id, name} = screen;

    return (
        <header className={cn(
            "flex",
            "max-md:flex-col",
            "md:justify-between md:items-center"
        )}>
            <section>
                <HeaderTitle>Edit | {name}</HeaderTitle>
                <HeaderDescription>
                    Edit the screen `{name}` here.
                </HeaderDescription>
            </section>

            <section className="space-x-2 flex justify-end items-center ">
                <HeaderLink
                    variant="link"
                    to="/admin/screens"
                >
                    <TableOfContents/> Index
                </HeaderLink>

                <HeaderLink
                    variant="link"
                    to={`/admin/screens/get/${_id}`}
                >
                    <Search/> Details
                </HeaderLink>
            </section>
        </header>
    );
};

export default ScreenEditHeader;
