/**
 * @fileoverview Defines a card component for displaying individual moderation
 * log entries, featuring action-specific accents, administrative details,
 * and formatted timestamps.
 */

import {ReactElement} from "react";
import {MovieReviewModerationLog} from "@/domains/review/features/moderation/schema";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {
    MovieReviewModerationActionBadge,
    MovieReviewModerationLogAccentBar
} from "@/views/admin/moviereviews/_comp";

/** Props for the CustomerReviewLogCard component. */
type CardProps = {
    log: MovieReviewModerationLog;
    className?: string;
};

/**
 * Renders a visual summary of a moderation event, including the action taken,
 * the timestamp, the administrator's rationale, and their identity.
 */
export function CustomerReviewLogCard(
    {log}: CardProps
): ReactElement {
    const {
        modDate,
        action,
        admin: {name, email},
        message
    } = log;

    const actionDate = modDate.toFormat("dd MMM yyyy, HH:mm");

    return (
        <Card className="overflow-hidden">
            <MovieReviewModerationLogAccentBar action={action}/>

            <CardContent className="px-3 pb-3 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                    <MovieReviewModerationActionBadge action={action}/>

                    <span className="text-xs secondary-text font-bold">
                        {actionDate}
                    </span>
                </div>

                <p className="primary-text text-sm lg:text-base">
                    {message}
                </p>

                <Separator/>

                <div>
                    <p className="primary-text text-sm font-extrabold ">
                        {name}
                    </p>
                    <p className="secondary-text text-xs font-bold">
                        {email}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}