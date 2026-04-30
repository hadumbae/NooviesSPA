/**
 * @fileoverview Presentational component for rendering theatre details and screen listings.
 */

import {ScreenWithShowings} from "@/domains/theatre-screens/schema/model";
import buildString from "@/common/utility/buildString.ts";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";

import {TheatreDetails} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";
import {TheatreScreenShowingSelectCard} from "@/views/client/theatre-screens/_feat/showing-selector";
import {ReactElement} from "react";

/** Props for the TheatreInfoPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screens: ScreenWithShowings[];
};

/**
 * Presentational component for rendering theatre details and screen listings.
 */
export function TheatreInfoPageContent(
    {theatre, screens}: ContentProps
): ReactElement {
    const {name: theatreName, location} = theatre;
    const {street, city, state} = location;
    const locationString = buildString([street, city, state], ", ");

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
                        <TheatreScreenShowingSelectCard
                            key={screen._id}
                            screen={screen}
                        />
                    )
                )}
            </div>
        </section>
    );

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{theatreName}</HeaderTitle>
                <HeaderDescription>{locationString}</HeaderDescription>
            </header>

            {screens.length > 0 ? screenSection : emptySection}
        </PageFlexWrapper>
    );
}

