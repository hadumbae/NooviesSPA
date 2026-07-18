import {ReactElement} from "react";
import {Plus} from "lucide-react";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";

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

            <HoverLink to="/admin/showings/create" message="Navigate to Showing Create.">
                <Plus/> Create
            </HoverLink>
        </header>
    );
}
