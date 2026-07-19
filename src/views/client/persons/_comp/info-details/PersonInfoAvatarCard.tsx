/**
 * @fileoverview A card component displaying a person's profile avatar and name.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {PersonProfileAvatar} from "@/views/admin/persons";
import {cn} from "@/common/_feat";

/** Props for the PersonInfoAvatarCard component. */
type CardProps = {
    name: string;
    imageURL?: string;
    classNames?: {
        image?: string;
        text?: string;
    };
};

/** Displays a person's image and name in a responsive card layout. */
export function PersonInfoAvatarCard(
    {name, imageURL, classNames}: CardProps
): ReactElement {
    return (
        <Card>
            <CardContent className={cn(
                "h-full flex px-5 items-center",
                "max-md:py-3 max-md:space-x-5",
                "md:py-5 md:flex-col md:justify-center md:space-y-5",
            )}>
                <PersonProfileAvatar name={name} imageLink={imageURL} className={cn(
                    "h-16 w-16 md:h-24 md:w-24 border-2 dark:border-none",
                    classNames?.image,
                )}/>

                <span className={cn(
                    "primary-text font-mono font-extrabold",
                    classNames?.text,
                )}>
                    {name}
                </span>
            </CardContent>
        </Card>
    );
}