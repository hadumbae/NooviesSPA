/**
 * @fileoverview A reusable card component for displaying lists of user-related data in the admin dashboard.
 */

import {ReactElement, ReactNode} from "react";
import {Link, To} from "react-router-dom";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";

/** Custom CSS class names for the card's internal elements. */
type CardClassNames = {
    card?: string;
    content?: string;
    header?: string;
    list?: string;
}

/** Props for the AdminUserDetailsListCard component. */
type CardProps = {
    headerText: string;
    viewLink: To;
    viewText?: string;
    classNames?: CardClassNames;
    children: ReactNode;
};

/** A card layout that displays a header with a navigation link and a list of child elements. */
export function CustomerDetailsListCard(
    {children, classNames, headerText, viewLink, viewText = "View All"}: CardProps
): ReactElement {
    return (
        <Card className={classNames?.card}>
            <CardContent className={cn("p-4 space-y-4", classNames?.content)}>
                <div className={cn("flex justify-between items-center", classNames?.header)}>
                    <h3 className="primary-text text-lg font-bold tracking-wide">{headerText}</h3>
                    <Link to={viewLink} className="hover-link">{viewText}</Link>
                </div>

                <div className={cn("grid grid-cols-1 gap-2", classNames?.list)}>
                    {children}
                </div>
            </CardContent>
        </Card>
    );
}