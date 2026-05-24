/**
 * @fileoverview Popover menu providing administrative actions for a specific showing.
 */

import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {Dispatch, ReactElement, ReactNode, SetStateAction} from "react";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

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
