import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import ScreenIndexHeader from "@/pages/screens/components/headers/ScreenIndexHeader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import useFetchScreens from "@/pages/screens/hooks/screens/fetch-screens/useFetchScreens.ts";
import useValidateData from "@/common/hooks/validation/use-validate-data/useValidateData.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";
import PageParseError from "@/common/components/page/errors/PageParseError.tsx";
import ScreenListCard from "@/pages/screens/components/lists/ScreenListCard.tsx";
import {PaginatedScreenDetailsSchema} from "@/pages/screens/schema/screen/Screen.schema.ts";
import EllipsisPaginationButtons from "@/common/components/pagination/EllipsisPaginationButtons.tsx";

const ScreensPage: FC = () => {
    useTitle("Screens")

    const {page, perPage, setPage} = usePaginationSearchParams({perPage: 15});

    const {data, isPending, isError, error: queryError} = useFetchScreens({
        page,
        perPage,
        paginated: true,
        virtuals: true,
        populate: true
    });

    const {success, data: paginatedScreens, error: parseError} = useValidateData({
        data,
        isPending,
        schema: PaginatedScreenDetailsSchema,
        message: "Invalid Movie Data.",
    });

    if (isPending) return <PageLoader/>;
    if (isError) return <PageHTTPError error={queryError}/>
    if (!success) return <PageParseError error={parseError}/>

    const {items: screens, totalItems} = paginatedScreens;

    const hasScreens = (screens || []).length > 0;

    return (
        <PageFlexWrapper>
            <ScreenIndexHeader/>

            {
                hasScreens
                    ? <PageSection className="space-y-5">
                        {screens.map((screen) => <ScreenListCard key={screen._id} screen={screen}/>)}

                        <EllipsisPaginationButtons
                            page={page}
                            perPage={perPage}
                            totalItems={totalItems}
                            setPage={setPage}
                        />
                    </PageSection>
                    : <PageCenter>
                        <span className="text-neutral-400 select-none">There Are No Screens</span>
                    </PageCenter>
            }

        </PageFlexWrapper>
    );
};

export default ScreensPage;
