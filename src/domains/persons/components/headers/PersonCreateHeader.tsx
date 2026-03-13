import { FC } from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

const PersonCreateHeader: FC = () => {
    return (
        <header className="space-y-2">
            <HeaderTitle>Create Person</HeaderTitle>
            <HeaderDescription>
                Record people here. Fill in the details and click on `Submit` to continue.
            </HeaderDescription>
        </header>
    );
};

export default PersonCreateHeader;
