/**
 * @fileoverview Component that renders a list of language badges for a showing.
 */

import {ReactElement} from "react";
import {ISO6391LanguageCode} from "@/common/_schemas/enums/ISO6391LanguageCodeSchema.ts";
import {Badge} from "@/common/components/ui/badge.tsx";
import {ISO6391LanguageLabels,} from "@/common/_const/languages/ISO6391LanguageLabels.ts";
import {cn} from "@/common/_feat/handle-ui/cn.ts";

/** Props for the ShowingLanguageBadges component. */
type BadgeProps = {
    languages: ISO6391LanguageCode[];
    className?: string;
};

/**
 * Renders a collection of badges representing the languages associated with a showing.
 * Maps ISO 639-1 language codes to their human-readable labels.
 */
export function ShowingLanguageBadges(
    {languages, className}: BadgeProps
): ReactElement {
    return (
        <div className={cn("space-x-2", className)}>
            {languages.map((code, index) => (
                <Badge key={`${code}-${index}`} variant="outline" className="text-xs">
                    {ISO6391LanguageLabels[code]}
                </Badge>
            ))}
        </div>
    );
}