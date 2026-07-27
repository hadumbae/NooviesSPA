/**
 * @fileoverview A pill component for displaying a user's unique identification code.
 */

import {ReactElement} from "react";
import {UserUniqueCode} from "@/domains/users";
import {cn} from "@/common/_feat";

/** Custom class names for the UserUniqueCodePill sub-elements. */
type PillClassNames = {
    container?: string;
    label?: string;
    code?: string;
}

/** Props for the UserUniqueCodePill component. */
type PillProps = {
    uniqueCode: UserUniqueCode;
    classNames?: PillClassNames;
};

/**
 * Renders a stylised badge containing a user's unique code and a descriptive label.
 */
export function UserUniqueCodePill(
    {uniqueCode, classNames}: PillProps
): ReactElement {
    return (
        <div className={cn("flex items-center space-x-2 rounded-container-border px-4 py-2", classNames?.container)}>
            <span className={cn("secondary-text text-xs font-bold tracking-tight select-none", classNames?.label)}>
                UNIQUE CODE
            </span>

            <span className={cn("primary-text truncate", classNames?.code)}>
                {uniqueCode}
            </span>
        </div>
    );
}