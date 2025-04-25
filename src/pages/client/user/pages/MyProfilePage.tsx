import {FC} from 'react';
import useFetchAuthUserDetails from "@/common/hooks/useFetchAuthUserDetails.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyProfileHeader from "@/pages/client/user/components/headers/MyProfileHeader.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import ClientRecentReservationListContainer
    from "@/pages/client/user/components/profile/ClientRecentReservationListContainer.tsx";
import ClientRecentFavouritesListContainer
    from "@/pages/client/user/components/profile/ClientRecentFavouritesListContainer.tsx";
import ClientRecentReviewsListContainer
    from "@/pages/client/user/components/profile/ClientRecentReviewsListContainer.tsx";

const MyProfilePage: FC = () => {
    const authUserDetails = useFetchAuthUserDetails();
    console.log(authUserDetails);

    if (!authUserDetails) return <PageLoader />;

    return (
        <PageFlexWrapper>
            <MyProfileHeader authUser={authUserDetails} />

            <Separator />

            <PageSection title="My Reservations">
                <ClientRecentReservationListContainer recentReservations={[]} />
                {/*TODO My Most Recent Reservations*/}
            </PageSection>

            <PageSection title="My Favourites">
                <ClientRecentFavouritesListContainer recentFavourites={[]} />
                {/*TODO My Most Recent Favourites*/}
            </PageSection>

            <PageSection title="My Reviews">
                <ClientRecentReviewsListContainer recentReviews={[]} />
                {/*TODO My Most Recent Reviews*/}
            </PageSection>
        </PageFlexWrapper>
    );
};

export default MyProfilePage;
