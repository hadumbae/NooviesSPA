/**
 * @fileoverview Card component for displaying individual moderation log entries for a customer.
 */

import {ReactElement} from "react";
import {MovieReviewModerationLog} from "@/domains/movieReviews/_feat/moderation/schema";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import {MovieReviewModerationActionBadge, MovieReviewModerationLogAccentBar} from "@/views/admin/movie-reviews/_comp";

/** Props for the CustomerReviewLogCard component. */
type CardProps = {
    log: MovieReviewModerationLog;
    className?: string;
};

/** Renders a visual summary of a moderation event including the action, timestamp, and administrator details. */
export function CustomerReviewLogCard(
    {log: {modDate, action, admin: {name, email}, message}}: CardProps
): ReactElement {
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