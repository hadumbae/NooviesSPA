import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/ShowingSchema.ts";
import ShowingListCard from "@/pages/showings/components/ShowingListCard.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";

interface Props {
    showings: Showing[];
    onShowingDelete: () => void;
}

const ShowingCardList: FC<Props> = ({showings, onShowingDelete}) => {
    if (showings.length === 0) {
        return <PageCenter>
            <span className="text-neutral-500">There are no showings.</span>
        </PageCenter>;
    }

    return (
        showings.map(
            (showing: Showing) => (
                <ShowingListCard
                    showing={showing}
                    key={showing._id}
                    onShowingDelete={onShowingDelete}
                />
            )
        )
    );
};

export default ShowingCardList;
