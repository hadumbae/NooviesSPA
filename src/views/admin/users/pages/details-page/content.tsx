import {ReactElement} from "react";
import {PageFlexWrapper, PageHeader} from "@/views/common/_comp";
import {User} from "@/domains/users";
import {PopulatedMovieReview} from "@/domains/movie-reviews";
import {PopulatedReservation} from "@/domains/reservations";

type ContentProps = {
    user: User;
    reviews: PopulatedMovieReview[];
    reservations: PopulatedReservation[];
    totalReviews: number;
    totalReservations: number;
};

export function UserDetailsPageContent(
    {user, reviews, reservations, totalReviews, totalReservations}: ContentProps
): ReactElement {
    const {name, uniqueCode} = user;
    return (
        <PageFlexWrapper>
            <PageHeader title={name} description={uniqueCode}/>
        </PageFlexWrapper>
    );
}