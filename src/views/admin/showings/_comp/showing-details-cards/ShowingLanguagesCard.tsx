/**
 * @fileoverview Card component displaying spoken and subtitle languages for a specific showing.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Showing, ShowingDetails} from "@/domains/showings/_schema/showing";
import {LabelContent} from "@/common/components/card-content/LabelContent.tsx";
import {ShowingLanguageBadges} from "@/views/admin/showings/_comp/badges";
import {cn} from "@/common/_feat";
import {CardClassNames} from "@/common/_types/card";

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

    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-4 space-y-2", classNames?.content)}>
                <LabelContent label="Spoken Languages" classNames={{container: "space-y-1"}}>
                    <ShowingLanguageBadges languages={[language]}/>
                </LabelContent>

                <LabelContent label="Subtitle Languages" classNames={{container: "space-y-1"}}>
                    <ShowingLanguageBadges languages={subtitleLanguages}/>
                </LabelContent>
            </CardContent>
        </Card>
    );
}