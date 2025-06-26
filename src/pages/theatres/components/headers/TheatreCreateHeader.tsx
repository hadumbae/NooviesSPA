import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {FC} from "react";

type TheatreCreateHeaderProps = {
    className?: string;
}

const TheatreCreateHeader: FC<TheatreCreateHeaderProps> = ({className}) => {
    return (
        <header className={className}>
            <HeaderTitle>Create Theatre</HeaderTitle>
            <HeaderDescription>Enter details and press on `Submit` to create theatres.</HeaderDescription>
        </header>
    );
};

export default TheatreCreateHeader;
