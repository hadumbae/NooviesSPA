/**
 * @fileoverview Card component displaying spoken and subtitle languages for a specific showing.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Showing, ShowingDetails} from "@/domains/showings/_schema/showing";
import {LabelContent} from "@/views/common/_comp/label-content/LabelContent.tsx";
import {cn} from "@/common/_feat";
import {CardClassNames} from "@/common/_types/card";
import {ISO6391LanguageLabels} from "@/common/_const";
import {ISO6391LanguageCode} from "@/common/_schemas";
import {BadgeEntry, BadgeList} from "@/views/common/_comp/badges";

/** Props for the ShowingLanguagesCard component. */
type CardProps = {
    showing: Showing | ShowingDetails;
    classNames?: CardClassNames;
};

/**
 * Displays a card containing badges for the primary spoken language and all subtitle languages of a showing.
 */
export function ShowingLanguagesCard(
    {showing, classNames}: CardProps
): ReactElement {
    const {language, subtitleLanguages} = showing;
    const mapLanguages = (lans: ISO6391LanguageCode[]): BadgeEntry[] => lans.map(
        (code) => ({key: code, text: ISO6391LanguageLabels[code]})
    );

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-4 space-y-4", classNames?.content)}>
                <LabelContent label="Spoken Languages" classNames={{container: "space-y-2"}}>
                    <BadgeList
                        classNames={{badge: "text-xs"}}
                        variant="outline"
                        entries={mapLanguages([language])}
                    />
                </LabelContent>

                <LabelContent label="Subtitle Languages" classNames={{container: "space-y-2"}}>
                    <BadgeList
                        classNames={{badge: "text-xs"}}
                        variant="outline"
                        entries={mapLanguages(subtitleLanguages)}
                    />
                </LabelContent>
            </CardContent>
        </Card>
    );
}