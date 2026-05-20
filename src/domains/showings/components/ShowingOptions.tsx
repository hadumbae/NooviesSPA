/**
 * @fileoverview Popover menu providing administrative actions for a specific showing.
 */

import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/ui/popover';
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {Ellipsis, Loader} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {useShowingDeleteMutation} from "@/domains/showings/_feat/crud-hooks/useShowingDeleteMutation.ts";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import {ShowingDetails} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {ReactElement} from "react";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/** Props for the ShowingOptions component. */
type OptionProps = {
    showing: ShowingDetails;
    variant?: ButtonVariant;
    onDeleteSuccess: () => void;
    className?: string;
};

/** Renders a popover with edit and delete actions for a movie showing. */
export function ShowingOptions(
    {showing: {_id, slug}, variant, className, onDeleteSuccess}: OptionProps
): ReactElement {
    const {mutate, isPending, isSuccess} = useShowingDeleteMutation({onSubmitSuccess: onDeleteSuccess});

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={variant ?? "default"}
                    className={cn(className)}
                    size="sm"
                >
                    <Ellipsis/>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 flex flex-col p-0">
                <LoggedLink className={buttonVariants({variant: "link"})} to={`/admin/showings/edit/${slug}`}>
                    Edit
                </LoggedLink>

                <Button
                    variant="link"
                    onClick={() => mutate({_id})}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    {
                        isPending || isSuccess
                            ? <Loader className="animate-spin"/>
                            : "Delete"
                    }
                </Button>
            </PopoverContent>
        </Popover>
    );
}
