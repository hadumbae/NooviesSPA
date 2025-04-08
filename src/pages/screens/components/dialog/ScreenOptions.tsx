import {FC} from 'react';
import {Screen} from "@/pages/screens/schema/ScreenSchema.ts";
import useScreenDeleteMutation from "@/pages/screens/hooks/useScreenDeleteMutation.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/common/components/ui/popover.tsx";
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Ellipsis} from "lucide-react";
import {Link} from "react-router-dom";

interface Props {
    screen: Screen;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    className?: string,
    onDelete: () => void,
}


const ScreenOptions: FC<Props> = ({screen, variant = "default", className = "", onDelete}) => {
    const {_id} = screen;
    const {mutate, isPending, isSuccess} = useScreenDeleteMutation({onDelete});

    const deleteScreen = () => {
        mutate({_id});
    }

    return (
        <Popover>

            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    className={cn(className)}
                >
                    <Ellipsis />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <Link
                    className={buttonVariants({variant: "link"})}
                    to={`/admin/screens/edit/${_id}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={deleteScreen}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    Delete
                </Button>
            </PopoverContent>

        </Popover>
    );
};

export default ScreenOptions;
