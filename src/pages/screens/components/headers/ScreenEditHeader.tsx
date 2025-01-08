import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Link} from "react-router-dom";
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Search, TableOfContents} from "lucide-react";
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";

interface Props {
    screen: Screen;
}

const ScreenEditHeader: FC<Props> = ({screen}) => {
    const {_id, name} = screen;

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Edit | {name}</HeaderTitle>
                <HeaderDescription>
                    Edit the screen `{name}` here.
                </HeaderDescription>
            </div>

            <div className="flex items-center space-x-2">
                <Link to="/admin/screens"
                      className={cn(buttonVariants({variant: "outline"}), "p-4")}
                >
                    <TableOfContents/>
                </Link>
                <Link to={`/admin/screens/get/${_id}`}
                      className={cn(buttonVariants({variant: "outline"}), "p-4")}
                >
                    <Search/>
                </Link>
            </div>
        </header>
    );
};

export default ScreenEditHeader;
