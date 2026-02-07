import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useGetAuthUser} from "@/pages/auth/hooks/authUser/useGetAuthUser.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import useParsedSearchParams from "@/common/hooks/search-params/useParsedSearchParams.ts";
import {MyProfilePageSearchParamsSchema} from "@/pages/users/schemas/params/MyProfilePageSearchParamsSchema.ts";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyProfileHeader from "@/pages/users/components/headers/MyProfileHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MyProfilePageTabs from "@/pages/users/pages/profile-page/tabs/MyProfilePageTabs.tsx";

const MyProfilePage: FC = () => {
    useTitle("My Profile");

    const user = useGetAuthUser();
    if (!user) return <PageLoader/>;

    const isMobile = useIsMobile();

    const {searchParams, setSearchParams} = useParsedSearchParams({
        schema: MyProfilePageSearchParamsSchema
    });

    const {activeTab} = searchParams;
    const setActiveTab = (tab: MyProfilePageActiveTab) => setSearchParams({...searchParams, activeTab: tab})

    return (
        <PageFlexWrapper>
            <MyProfileHeader user={user} setTab={setActiveTab} showTabSelector={isMobile}/>

            <Separator/>

            <section className="flex-1 flex flex-col">
                <SectionHeader srOnly={true}>Tabs</SectionHeader>

                <MyProfilePageTabs
                    user={user}
                    activeTab={activeTab ?? "password"}
                    setActiveTab={setActiveTab}
                    showTabSelector={!isMobile}
                    className="flex-1"
                />
            </section>
        </PageFlexWrapper>
    );
};

export default MyProfilePage;
