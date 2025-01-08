import {FC, useContext} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {AuthContext} from "@/pages/auth/context/AuthContext.ts";

const HomePage: FC = () => {
    const authUserDetails = useContext(AuthContext);
    console.log(authUserDetails);

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>Homepage</HeaderTitle>
            </header>
        </PageFlexWrapper>
    );
};

export default HomePage;
