import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

interface HeaderProps {
    name: string;
}

const PersonProfileImageHeader: FC<HeaderProps> = ({name}) => {
    return (
        <header className="flex flex-col space-y-2">
            <HeaderTitle>{name} | Profile Image</HeaderTitle>
            <HeaderDescription>Update profile images.</HeaderDescription>
        </header>
    );
};

export default PersonProfileImageHeader;
