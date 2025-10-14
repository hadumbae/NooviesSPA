import {FC} from 'react';
import ShowingListCard from "@/pages/showings/components/ShowingListCard.tsx";
import {Showing} from "@/pages/showings/schema/showing/Showing.types.ts";

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
