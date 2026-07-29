/**
 * @fileoverview Component for displaying a customer's unique identification code with a link to their profile.
 */

import {ReactElement} from "react";
import {LoggedLink} from "@/views/common/_feat";
import {cn} from "@/common/_feat";
import {ObjectId} from "@/common/_schemas";
import {UserUniqueCode} from "@/domains/users";

/** Style overrides for the CustomerUniqueCodeDisplay component. */
export type DisplayClassNames = {
    container?: string;
    text?: string;
    link?: string;
}

/** Props for the CustomerUniqueCodeDisplay component. */
type DisplayProps = {
    customerID: ObjectId;
    uniqueCode: UserUniqueCode;
    classNames?: DisplayClassNames;
};

/** Displays a customer's unique code as a navigable link. */
export function CustomerUniqueCodeDisplay(
    {customerID, uniqueCode, classNames}: DisplayProps
): ReactElement {
    return (
        <div className={cn("flex flex-col items-center justify-center py-1", classNames?.container)}>
            <span className={cn("text-[10px] uppercase tracking-widest text-muted-foreground mb-1", classNames?.text)}>
                Customer Unique Code
            </span>

            <LoggedLink to={`/admin/customers/${customerID}`}>
                <h4 className={cn(
                    "text-xl font-extrabold font-oswald tracking-wider text-primary",
                    "hover:underline hover:underline-offset-8",
                    classNames?.link
                )}>
                    {uniqueCode}
                </h4>
            </LoggedLink>
        </div>
    );
}