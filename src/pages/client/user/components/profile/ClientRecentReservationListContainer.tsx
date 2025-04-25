import {FC} from 'react';

interface ClientRecentReservationListContainerProps {
    recentReservations: any[],
}

const ClientRecentReservationListContainer: FC<ClientRecentReservationListContainerProps> = ({recentReservations}) => {
    if (!recentReservations || recentReservations.length === 0) {
        return <section className="flex justify-center items-center min-h-40">
            <span className="text-sm text-neutral-400 select-none">You have no reservations.</span>

            {/*TODO - Add Link To Movies Page*/}
            {/*<Link>Reserve movies here!</Link>*/}
        </section>
    }

    return (
        <section className="min-h-40 grid grid-cols-2 gap-2">
            {/*TODO ClientReservationList*/}
            <span>List Of Reservations</span>
        </section>
    );
};

export default ClientRecentReservationListContainer;
