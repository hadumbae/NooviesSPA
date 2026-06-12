import {
    useFetchCurrentUserFavourites
} from "@/domains/users/_feat/manage-user-favourites/hooks/useFetchCurrentUserFavourites.ts";
import {
    useToggleUserFavouriteMovie
} from "@/domains/users/_feat/manage-user-favourites/hooks/useToggleUserFavouriteMovie.ts";
import {ManageUserFavouritesQueryKeys} from "@/domains/users/_feat/manage-user-favourites/hooks/queryKeys.ts";
import {ManageUserFavouritesMutationKeys} from "@/domains/users/_feat/manage-user-favourites/hooks/mutationKeys.ts";
import {useCheckIsFavouriteMovie} from "@/domains/users/_feat/manage-user-favourites/hooks/useCheckIsFavouriteMovie.ts";

export {
    ManageUserFavouritesQueryKeys,
    ManageUserFavouritesMutationKeys,
    useCheckIsFavouriteMovie,
    useFetchCurrentUserFavourites,
    useToggleUserFavouriteMovie,
}

