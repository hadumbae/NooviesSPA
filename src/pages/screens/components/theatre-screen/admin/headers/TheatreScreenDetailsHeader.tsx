/**
 * @file TheatreScreenDetailsHeader.tsx
 * @summary
 * Header section for the Theatre Screen Details page, showing the screen title,
 * theatre name, and action menu.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import ScreenDetailsOptions from "@/pages/screens/components/admin/features/screen-details/ScreenDetailsOptions.tsx";

/**
 * Props for {@link TheatreScreenDetailsHeader}.
 *
 * @property theatreName - Name of the parent theatre.
 * @property screenName - Name of the screen being viewed.
 */
type DetailsHeader = {
    theatreName: string;
    screenName: string;
};

/**
 * Renders the heading section for the Screen Details page.
 *
 * @description
 * Displays the screen name, theatre name, and an options dropdown
 * (edit/delete). Used at the top of the Screen Details admin view.
 *
 * @param props - Component props containing theatre and screen names.
 * @returns A header element with title, description, and options menu.
 */
const TheatreScreenDetailsHeader = ({ theatreName, screenName }: DetailsHeader) => {
    return (
        <header className="flex justify-between items-center">
            <section className="flex-1">
                <HeaderTitle>{screenName} Details</HeaderTitle>
                <HeaderDescription>Screen at {theatreName}. Handle seats and showings here.</HeaderDescription>
            </section>

            <ScreenDetailsOptions />
        </header>
    );
};

export default TheatreScreenDetailsHeader;
