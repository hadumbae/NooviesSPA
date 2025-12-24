import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";

const HomePage: FC = () => {
    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Homepage</HeaderTitle>
            </header>
        </PageFlexWrapper>
    );
};

export default HomePage;
