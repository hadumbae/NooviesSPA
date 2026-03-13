import {FC} from 'react';

interface ClientRecentReviewsListContainerProps {
    recentReviews: any[],
}

const ClientRecentReviewsListContainer: FC<ClientRecentReviewsListContainerProps> = ({recentReviews}) => {
    if (!recentReviews || recentReviews.length === 0) {
        return <section className="flex justify-center items-center min-h-40">
            <span className="text-sm text-neutral-400 select-none">You have no reviews.</span>
        </section>
    }

    return (
        <section className="min-h-40 grid grid-cols-2 gap-2">
            {/*TODO ClientReviewsList*/}
            <span>List Of Reviews</span>
        </section>
    );
};

export default ClientRecentReviewsListContainer;
