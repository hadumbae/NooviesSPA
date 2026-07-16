/**
 * @fileoverview Popover menu providing administrative actions for a specific showing.
 */

import {Dispatch, ReactElement, ReactNode, SetStateAction} from "react";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";
import {Button, buttonVariants, Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui";

/** Props for the ShowingOptions component. */
type OptionProps = {
    children?: ReactNode;
    showingSlug: SlugString;
    setIsDeleting: Dispatch<SetStateAction<boolean>>;
};

/** Renders a popover with edit and delete actions for a movie showing. */
export function ShowingDetailsPageToggles(
    {children, showingSlug, setIsDeleting}: OptionProps
): ReactElement {
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
                    onClick={() => setIsDeleting(true)}
                >
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    );
}
