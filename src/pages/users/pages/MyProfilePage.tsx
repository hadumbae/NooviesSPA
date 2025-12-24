import {FC} from 'react';
import useFetchAuthUserDetails from "@/common/hooks/auth/useLogoutUser.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyProfileHeader from "@/pages/users/components/headers/MyProfileHeader.tsx";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import PageSection from "@/common/components/page/PageSection.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import ClientRecentReservationListContainer
    from "@/pages/users/components/profile/ClientRecentReservationListContainer.tsx";
import ClientRecentFavouritesListContainer
    from "@/pages/users/components/profile/ClientRecentFavouritesListContainer.tsx";
import ClientRecentReviewsListContainer
    from "@/pages/users/components/profile/ClientRecentReviewsListContainer.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/common/components/ui/card.tsx";
import UpdateUserPasswordFormContainer from "@/pages/users/components/forms/UpdateUserPasswordFormContainer.tsx";

const MyProfilePage: FC = () => {
    const authUserDetails = useFetchAuthUserDetails();

    if (!authUserDetails) return <PageLoader />;

    const {user: userID} = authUserDetails;

    return (
        <PageFlexWrapper>
            <MyProfileHeader authUser={authUserDetails} />

            <Separator />

            <PageSection title="Update My Password">
                <Card>
                    <CardHeader>
                        <CardTitle>Update Your Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateUserPasswordFormContainer userID={userID} />
                    </CardContent>
                </Card>
            </PageSection>

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
