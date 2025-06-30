import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import useFetchScreenParams from "@/pages/screens/hooks/screens/params/useFetchScreenParams.ts";
import useFetchScreen from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreen.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import ScreenDetailsHeader from "@/pages/screens/components/headers/ScreenDetailsHeader.tsx";
import ScreenDetailsCard from "@/pages/screens/components/ScreenDetailsCard.tsx";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";

const ScreenPage: FC = () => {
    const {screenID} = useFetchScreenParams();
    const {data: screen, isPending, isError, error} = useFetchScreen({_id: screenID!});

    if (isPending) return <PageLoader />;
    if (isError) return <PageError error={error} />;

    return (
        <PageFlexWrapper>
            <ScreenDetailsHeader screen={screen} />

            <section>
                <ScreenDetailsCard screen={screen} />
            </section>

            {/* TODO Paginated Seats */}
            <section>
                <HeaderTitle className="text-xl">Seats TODO</HeaderTitle>
            </section>
        </PageFlexWrapper>
    );
};

export default ScreenPage;
