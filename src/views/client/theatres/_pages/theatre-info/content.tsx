/**
 * @fileoverview Presentational component for rendering theatre details and screen listings.
 */

import {TheatreScreenSchedule} from "@/domains/theatre-screens/_schema/model";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {PageFlexWrapper} from "@/views/common/_comp/page";

import {TheatreDetails} from "@/domains/theatres/schema/theatre/TheatreDetailsSchema.ts";
import {TheatreScreenShowingSelectCard} from "@/views/client/theatre-screens/_feat/showing-selector";
import {ReactElement} from "react";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {formatTheatreDetails} from "@/domains/theatres/_feat/formatters";

/** Props for the TheatreInfoPageContent component. */
type ContentProps = {
    theatre: TheatreDetails;
    screens: TheatreScreenSchedule[];
};

/**
 * Presentational component for rendering theatre details and screen listings.
 */
export function TheatreInfoPageContent(
    {theatre, screens}: ContentProps
): ReactElement {
    const {name, location: {timezone}, formatted: {address}} = formatTheatreDetails(theatre);

    return (
        <PageFlexWrapper>
            <header>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>{address}</HeaderDescription>
            </header>

            {
                screens.length > 0
                    ? (
                        <section className="flex-1 space-y-2">
                            <SectionHeader>Screens</SectionHeader>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {screens.map((screen) => (
                                    <TheatreScreenShowingSelectCard
                                        key={screen._id}
                                        screen={screen}
                                        timezone={timezone}
                                    />
                                ))}
                            </div>
                        </section>
                    )
                    : (
                        <EmptyArrayContainer
                            text="There Are No Screens"
                            className="flex-1"
                        />
                    )
            }
        </PageFlexWrapper>
    );
}

