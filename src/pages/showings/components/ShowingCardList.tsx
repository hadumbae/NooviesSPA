import {FC} from 'react';
import {Showing} from "@/pages/showings/schema/base/ShowingSchema.ts";
import ShowingListCard from "@/pages/showings/components/ShowingListCard.tsx";

interface Props {
    showings: Showing[];
    onShowingDelete: () => void;
}

const ShowingCardList: FC<Props> = ({showings, onShowingDelete}) => {
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
