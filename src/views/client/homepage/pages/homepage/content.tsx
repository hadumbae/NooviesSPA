import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader, PageSectionHeader} from "@/views/common/_comp";
import {useAuthContext} from "@/domains/auth";
import {ClientHomepageViewData} from "@/domains/pages/_feat/client-view-data";

type ContentProps = {
    viewData: ClientHomepageViewData;
};

export function HomePageContent(
    {viewData}: ContentProps
): ReactElement {
    const {user} = useAuthContext();
    const {movies, genres, theatres, showings, reservations} = viewData;

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Noovies"
                description={user ? `Hello, ${user.name}!` : "Hello!"}
            />

            <section>
                <PageSectionHeader text="Recent"/>
                <span>{movies.length} Movies</span>
            </section>

            <section>
                <PageSectionHeader text="Featured Genres"/>
                <span>{genres.length} Genres</span>
            </section>

            <section>
                <PageSectionHeader text="Theatres Near You"/>
                <span>{theatres.length} Theatres</span>
            </section>

            <section>
                <PageSectionHeader text="Upcoming Showings"/>
                <span>{showings.length} Showings</span>
            </section>

            <section>
                <PageSectionHeader text="Your Reservations"/>
                <span>{reservations.length} Reservations</span>
            </section>
        </PageFlexWrapper>
    );
}