/**
 * @file TheatreInfoPageContent.tsx
 *
 * Presentational component for rendering theatre details and screen listings.
 *
 * Displays:
 * - Theatre name and location
 * - Available screens with showings
 * - Empty-state messaging when no screens exist
 */

import {TheatreDetails}
    from "@/pages/theatres/schema/model/theatre/Theatre.types.ts";
import {ScreenWithShowings}
    from "@/pages/screens/schema/screen/ScreenWithShowingsSchema.ts";
import PageFlexWrapper
    from "@/common/components/page/PageFlexWrapper.tsx";
import buildString
    from "@/common/utility/buildString.ts";
import HeaderTitle
    from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription
    from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn}
    from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS}
    from "@/common/constants/css/TextCSS.ts";
import SectionHeader
    from "@/common/components/page/SectionHeader.tsx";
import ScreenShowingSelectCard
    from "@/pages/screens/components/client/browse/ScreenShowingSelectCard.tsx";

/**
 * Props for {@link TheatreInfoPageContent}.
 */
type ContentProps = {
    /** Theatre metadata */
    theatre: TheatreDetails;
    /** Screens with associated showings */
    screens: ScreenWithShowings[];
};

/**
 * Theatre info page content.
 *
 * Renders theatre metadata and a responsive grid of screens,
 * falling back to an empty state when no screens are available.
 *
 * @param theatre - Theatre details
 * @param screens - Screens with showings
 */
const TheatreInfoPageContent = (
    {theatre, screens}: ContentProps
) => {
    // --- THEATRE ---
    const {name: theatreName, location} = theatre;
    const {street, city, state} = location;
    const locationString = buildString([street, city, state], ", ");

    // --- SCREEN ---
    const emptySection = (
        <div className="flex-1 flex justify-center items-center">
            <span className={cn(SecondaryTextBaseCSS, "select-none uppercase")}>
                There Are No Screens
            </span>
        </div>
    );

    const screenSection = (
        <section className="flex-1 space-y-2">
            <SectionHeader>Screens</SectionHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {screens.map(
                    (screen) => (
                        <ScreenShowingSelectCard
                            key={screen._id}
                            screen={screen}
                        />
                    )
                )}
            </div>
        </section>
    );

    // --- RENDER ---
    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{theatreName}</HeaderTitle>
                <HeaderDescription>{locationString}</HeaderDescription>
            </header>

            {screens.length > 0 ? screenSection : emptySection}
        </PageFlexWrapper>
    );
};

export default TheatreInfoPageContent;
