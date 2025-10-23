import {FC} from 'react';
import {Button} from "@/common/components/ui/button.tsx";
import ButtonSize from "@/common/type/ui/shad-cn-button/ButtonSize.ts";
import {Heart, Loader} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";

interface ButtonProps {
    size?: ButtonSize;
    isFavourite: boolean;
    onClick: () => void;
    isPending?: boolean;
    className?: string;
}

const FavouritesButton: FC<ButtonProps> = ({size = "default", isFavourite, onClick, isPending, className}) => {
    const favouriteText = isFavourite ? "Remove From Favourites" : "Add To Favourites";
    const buttonCSS = isFavourite ? "text-pink-500 border-pink-500" : "text-neutral-400 border-neutral-300";

    const buttonProps = {
        "aria-label": favouriteText,
        "aria-busy": isPending,
        variant: "outline" as ButtonVariant,
        size: size,
        onClick: onClick,
        disabled: isPending,
    };

    return (
        <Button
            {...buttonProps}
            className={cn(
                buttonCSS,
                "hover:border-neutral-900",
                className,
            )}
        >
            {
                isPending
                    ? <Loader className="animate-spin"/>
                    : <>
                        <Heart />
                        {favouriteText}
                    </>
            }
        </Button>
    );
};

export default FavouritesButton;
