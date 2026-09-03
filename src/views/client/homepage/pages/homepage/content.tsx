import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {useAuthContext} from "@/domains/auth";
import {ClientHomepageViewData} from "@/domains/pages/_feat/client-view-data";
import {
    HomepageGenresSection,
    HomepageRecentSection,
    HomepageTheatresSection,
    HomepageUpcomingShowingsSection,
    HomepageYourReservationsSection
} from "@/views/client/homepage/pages/homepage/sections";

type ContentProps = {
    viewData: ClientHomepageViewData;
};

export function HomePageContent(
    {viewData}: ContentProps
): ReactElement {
    const {user} = useAuthContext();
    const {movies, genres, theatres, showings, reservations} = viewData;

    return (
        <PageFlexWrapper className="space-y-10">
            <PageHeader
                title="Noovies"
                description={user ? `Hello, ${user.name}!` : "Hello!"}
            />

            <HomepageRecentSection recentMovies={movies}/>
            <HomepageGenresSection genres={genres}/>
            <HomepageTheatresSection theatres={theatres}/>
            <HomepageUpcomingShowingsSection showings={showings}/>

            {
                user &&
                <HomepageYourReservationsSection reservations={reservations}/>
            }

        </PageFlexWrapper>
    );
}