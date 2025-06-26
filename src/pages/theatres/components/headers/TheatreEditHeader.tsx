import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

type TheatreEditHeaderProps = {
    theatre: Theatre;
    className?: string;
}

const TheatreEditHeader: FC<TheatreEditHeaderProps> = ({theatre, className}) => {
    const {name} = theatre

    return (
        <header className={cn(className)}>
            <HeaderTitle>{name}</HeaderTitle>
            <HeaderDescription>Edit the theatre ({name}) here.</HeaderDescription>
        </header>
    );
};

export default TheatreEditHeader;
