/**
 * @fileoverview Header component for the showing details admin page.
 */

import {ReactElement} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {TableOfContents} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Button} from "@/common/components/ui/button.tsx";
import {MovieTitle} from "@/domains/movies/schema/fields";
import {DateTime} from "luxon";

/** Props for the ShowingDetailsHeader component. */
type HeaderProps = {
    movieTitle: MovieTitle;
    releaseDate?: DateTime | null;
    screenName: string;
    theatreName: string;
}

/**
 * Displays the movie title, release year, and location details for a specific showing.
 */
export function ShowingDetailsHeader(
    {movieTitle, releaseDate, screenName, theatreName}: HeaderProps
): ReactElement {
    const navigate = useNavigate();

    const formattedReleaseDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    const navigateToIndex = () => {
        navigate("/admin/showings");
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <HeaderTitle>{movieTitle} ({formattedReleaseDate})</HeaderTitle>
                <HeaderDescription>Showing on {screenName} at {theatreName}.</HeaderDescription>
            </div>

            <Button variant="outline" className="p-2" onClick={navigateToIndex}>
                <TableOfContents/>
            </Button>
        </header>
    );
}
