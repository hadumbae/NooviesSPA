/**
 * @fileoverview Popover menu providing administrative actions for a specific showing.
 */

import {ReactElement, ReactNode} from "react";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {Button, buttonVariants, Popover, PopoverContent, PopoverTrigger} from "@/views/common/_comp/ui";
import {useIsDeletingUIContextActions} from "@/common/_ctx/ui";

/** Props for the ShowingOptions component. */
type OptionProps = {
    children?: ReactNode;
    showingSlug: SlugString;
};

/** Renders a popover with edit and delete actions for a movie showing. */
export function ShowingDetailsPageToggles(
    {children, showingSlug}: OptionProps
): ReactElement {
    const {open: openDeleting} = useIsDeletingUIContextActions();

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <LoggedLink
                    className={buttonVariants({variant: "link"})}
                    to={`/admin/showings/edit/${showingSlug}`}
                >
                    Edit
                </LoggedLink>

                <Button
                    variant="link"
                    onClick={() => openDeleting()}
                >
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
}
