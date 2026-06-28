/**
 * @fileoverview Component for displaying the spoken and subtitle languages of a movie showing.
 *
 */

import {ReactElement} from "react";
import {Captions, Volume2} from "lucide-react";
import {ISO6391LanguageCode} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {ISO6391LanguageLabels} from "@/common/constants/languages/ISO6391LanguageLabels.ts";

const ICON_CSS = "text-with-icon max-md:text-xs font-bold select-none";

/** Props for the ShowingInfoLanguages component. */
type InfoProps = {
    language: ISO6391LanguageCode;
    subtitleLanguages: ISO6391LanguageCode[];
};

/** Displays the primary audio language and available subtitles for a showing. */
export function ShowingInfoLanguages(
    {language, subtitleLanguages}: InfoProps
): ReactElement {
    const spokenLanguage = ISO6391LanguageLabels[language];
    const subtitles = subtitleLanguages.map(l => ISO6391LanguageLabels[l]).join(' • ');

    return (
        <div className="flex-1 flex flex-col space-y-2 text-sm">
            <span className={ICON_CSS}>
                <Volume2/> {spokenLanguage}
            </span>

            <span className={ICON_CSS}>
                <Captions/> {subtitles}
            </span>
        </div>
    );
}