import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import ButtonVariants from "@/common/type/ui/ButtonVariants.ts";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    variant?: ButtonVariants;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const HeaderButton: FC<PropsWithChildren<Props>> = ({children, className, onClick, disabled, variant = "outline"}) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "text-neutral-400 hover:text-black p-2",
                className
            )}
        >
            {children}
        </Button>
    );
};

export default HeaderButton;
