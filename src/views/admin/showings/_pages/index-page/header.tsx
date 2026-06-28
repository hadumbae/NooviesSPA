import {ReactElement} from "react";
import {Plus} from "lucide-react";
import {HeaderDescription} from "@/common/components/page/headers";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";

/**
 * @fileoverview Header section for the Showings index page.
 */

/**
 * Renders the page title, description, and a link to create a new showing.
 */
export function ShowingIndexHeader(): ReactElement {
    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>Showings</HeaderTitle>
                <HeaderDescription>The showings of movies at theatres.</HeaderDescription>
            </div>

            <LoggedHoverLink to="/admin/showings/create" message="Navigate to Showing Create.">
                <Plus/> Create
            </LoggedHoverLink>
        </header>
    );
}
