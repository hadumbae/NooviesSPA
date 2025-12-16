import {Button} from "@/common/components/ui/button.tsx";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import {LucideIcon} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {Dispatch, SetStateAction} from "react";

type WidePanelButtonProps = {
    className?: string;
    isActive: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    icon: LucideIcon;
    text: string;
}

const WidePanelButton = (props: WidePanelButtonProps) => {
    const {
        className,
        isActive,
        setActive,
        text,
        icon: Icon,
    } = props;

    const variant: ButtonVariant = isActive ? "secondary" : "primary";

    const onClick = () => setActive((prev) => !prev);

    return (
        <Button
            type="button"
            variant={variant}
            className={cn("w-full transition-none", className)}
            onClick={onClick}
        >
            <Icon /> {text}
        </Button>
    );
};

export default WidePanelButton;
