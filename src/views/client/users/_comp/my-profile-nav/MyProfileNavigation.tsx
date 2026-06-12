/**
 * @fileoverview Navigation component for the user profile section.
 */

import {ReactElement} from "react";
import {MyProfileNavigationButton} from "@/views/client/users/_comp/my-profile-nav/MyProfileNavigationButton.tsx";

/** Navigation bar containing links to various user account sections. */
export function MyProfileNavigation(): ReactElement {
    return (
        <nav className="flex items-center space-x-5">
            <MyProfileNavigationButton to="/account/profile">
                My Profile
            </MyProfileNavigationButton>

            <MyProfileNavigationButton to="/account/reservations">
                My Reservations
            </MyProfileNavigationButton>

            <MyProfileNavigationButton to="/account/reviews">
                My Reviews
            </MyProfileNavigationButton>

            <MyProfileNavigationButton to="/account/favourites">
                My Favourites
            </MyProfileNavigationButton>
        </nav>
    );
}