import {FC, HTMLAttributeAnchorTarget, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Link, To} from "react-router-dom";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import ButtonSize from "@/common/type/ui/shad-cn-button/ButtonSize.ts";

interface Props {
    to: To;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    target?:  HTMLAttributeAnchorTarget;
}

const ButtonLink: FC<PropsWithChildren<Props>> = (
    {children, className, to, target, variant = "link", size = "default"}
) => {
    return (
        <Link
            to={to}
            target={target}
            className={cn(
                buttonVariants({variant, size}),
                "text-neutral-400 hover:text-black",
                className,
            )}>
            {children}
        </Link>
    );
};

export default ButtonLink;
