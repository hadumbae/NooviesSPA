import {forwardRef, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import {Button} from "@/common/components/ui/button.tsx";

interface Props {
    variant?: ButtonVariant;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const HeaderButton = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
    ({children, className, onClick, disabled, variant = "outline"}, ref) => {
        return (
            <Button
                ref={ref}
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
    })

HeaderButton.displayName = "HeaderButton";

export default HeaderButton;