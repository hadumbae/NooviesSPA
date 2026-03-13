import {FC} from 'react';

interface ClientRecentFavouritesListContainerProps {
    recentFavourites: any[],
}

const ClientRecentFavouritesListContainer: FC<ClientRecentFavouritesListContainerProps> = ({recentFavourites}) => {
    if (!recentFavourites || recentFavourites.length === 0) {
        return <section className="flex justify-center items-center min-h-40">
            <span className="text-sm text-neutral-400 select-none">You have no favourites.</span>
        </section>
    }

    return (
        <section className="min-h-40 grid grid-cols-2 gap-2">
            {/*TODO ClientFavouritesList*/}
            <span>List Of Favourites</span>
        </section>
    );
};

export default ClientRecentFavouritesListContainer;
