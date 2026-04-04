import {Reservation} from "@/domains/reservation/schema/model";
import {MovieReviewWithMovie} from "@/domains/review/schemas/models/MovieReview.types.ts";
import {LeanUser} from "@/domains/users/schemas/user";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import {
    CustomerProfileReviewSection
} from "@/views/admin/customers/customer-profile-page/sections/CustomerProfileReviewSection.tsx";
import {
    CustomerProfileReservationSection
} from "@/views/admin/customers/customer-profile-page/sections/CustomerProfileReservationSection.tsx";

type ContentProps = {
    customer: LeanUser;
    reservations: Reservation[];
    reviews: MovieReviewWithMovie[];
    reservationCount: number;
    reviewCount: number;
};

export const CustomerProfilePageContent = (
    {customer, reservations, reservationCount, reviewCount, reviews}: ContentProps
) => {
    const {uniqueCode: code} = customer;

    return (
        <PageFlexWrapper>
            {CustomerProfilePageContent.name}

            <CustomerProfileReservationSection
                code={code}
                itemCount={reservationCount}
                reservations={reservations}
            />

            <CustomerProfileReviewSection
                code={code}
                itemCount={reviewCount}
                reviews={reviews}
            />
        </PageFlexWrapper>
    );
};