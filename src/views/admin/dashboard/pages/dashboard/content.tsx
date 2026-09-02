import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader, StatItem} from "@/views/common/_comp";
import {DateTime} from "luxon";
import {AdminDashboardViewData} from "@/domains/pages/_feat/admin-view-data";
import {Link} from "react-router-dom";

type ContentProps = {
    stats: AdminDashboardViewData
};

export function DashboardPageContent(
    {stats}: ContentProps
): ReactElement {
    const todayDate = DateTime.now().toFormat("dd LLL, yyyy");

    const {
        genres,
        persons,
        theatres,
        movies,
        showings,
        activeShowings,
        reservations,
        activeReservations,
        roleTypes,
        movieReviews,
        publicMovieReviews,
    } = stats

    return (
        <PageFlexWrapper>
            <PageHeader
                title="Dashboard"
                description={todayDate}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                <Link to="/admin/genres">
                    <StatItem
                        text={genres.toString()}
                        label="Genres"
                    />
                </Link>

                <Link to="/admin/persons">
                    <StatItem
                        text={persons.toString()}
                        label="Persons"
                    />
                </Link>

                <Link to="/admin/roletypes">
                    <StatItem
                        text={roleTypes.toString()}
                        label="Role Types"
                    />
                </Link>

                <Link to="/admin/theatres">
                    <StatItem
                        text={theatres.toString()}
                        label="Theatres"
                    />
                </Link>

                <Link to="/admin/movies">
                    <StatItem
                        text={movies.toString()}
                        label="Movies"
                    />
                </Link>


                <Link to="/admin/showings">
                    <StatItem
                        text={`${activeShowings.toString()}/${showings.toString()}`}
                        label="Active/Showings"
                    />
                </Link>

                <Link to="/admin/reservations/fetch/by-unique-code">
                    <StatItem
                        text={`${activeReservations.toString()}/${reservations.toString()}`}
                        label="Active/Reservations"
                    />
                </Link>

                <Link to="/admin/customers">
                    <StatItem
                        text={`${publicMovieReviews.toString()}/${movieReviews.toString()}`}
                        label="Public/Movie Reviews"
                    />
                </Link>

            </div>
        </PageFlexWrapper>
    );
}