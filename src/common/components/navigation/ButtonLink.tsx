import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Link, To} from "react-router-dom";
import ButtonVariant from "@/common/type/ui/ButtonVariant.ts";
import ButtonSize from "@/common/type/ui/ButtonSize.ts";

interface Props {
    to: To;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const ButtonLink: FC<PropsWithChildren<Props>> = ({children, className, to, variant = "link", size = "default"}) => {
    return (
        <Link to={to} className={cn(buttonVariants({variant, size}), className)}>
            {children}
        </Link>
    );
};

export default ButtonLink;
