/**
 * @file Favourite movie toggle button component.
 * FavouriteMovieHeartButton.tsx
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {forwardRef, useState} from "react";
import {Heart, HeartMinus, HeartPlus} from "lucide-react";
import {Button, ButtonProps} from "@/common/components/ui/button.tsx";

/** Props for FavouriteMovieHeartButton. */
type HeartProps = ButtonProps & {
    /** Current favourite state for the movie. */
    isFavourite: boolean;
    /** Target movie identifier. */
    movieID: ObjectId;
}

const IS_FAVOURITE_CSS = "text-green-600 dark:text-green-400";
const NOT_FAVOURITE_CSS = "text-gray-500 dark:text-gray-300";

const SET_ACTIVE_CSS = "text-green-500 dark:text-green-300";
const SET_INACTIVE_CSS = "text-red-600 dark:text-red-400";

/** Renders a hover-aware favourite toggle button. */
const FavouriteMovieHeartButton = forwardRef<HTMLButtonElement, HeartProps>((props, ref) => {
    const {isFavourite, movieID, ...buttonProps} = props;

    const HoverIcon = isFavourite ? HeartMinus : HeartPlus;
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <Button
            {...buttonProps}
            ref={ref}
            type="button"
            variant="outline"
            size="icon"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {
                isHovered
                    ? <HoverIcon className={isFavourite ? SET_INACTIVE_CSS : SET_ACTIVE_CSS}/>
                    : <Heart className={isFavourite ? IS_FAVOURITE_CSS : NOT_FAVOURITE_CSS}/>
            }
        </Button>
    );
})

export default FavouriteMovieHeartButton;