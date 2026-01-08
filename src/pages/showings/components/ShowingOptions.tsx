/**
 * @file ShowingOptions.tsx
 *
 * Action menu component for a single `Showing`.
 *
 * Provides contextual actions:
 * - Navigate to edit view
 * - Delete the showing with mutation feedback
 */

import {Popover, PopoverContent, PopoverTrigger} from '@/common/components/ui/popover';
import {Button, buttonVariants} from "@/common/components/ui/button.tsx";
import {Ellipsis, Loader} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import useShowingDeleteMutation from "@/pages/showings/hooks/mutations/useShowingDeleteMutation.ts";
import {Link} from "react-router-dom";
import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";

/**
 * Props for {@link ShowingOptions}.
 */
type OptionProps = {
    /** Showing entity used for routing and deletion */
    showing: ShowingDetails;

    /** Button variant for the trigger */
    variant?: ButtonVariant;

    /** Callback invoked after successful deletion */
    onDeleteSuccess: () => void;

    /** Optional className for the trigger button */
    className?: string;
};

/**
 * Renders a popover-based action menu for a Showing.
 *
 * @example
 * ```tsx
 * <ShowingOptions
 *   showing={showing}
 *   onDeleteSuccess={refetch}
 * />
 * ```
 */
const ShowingOptions = (props: OptionProps) => {
    const {showing: {_id, slug}, variant, className, onDeleteSuccess} = props;

    const {mutate, isPending, isSuccess} = useShowingDeleteMutation({
        onDeleteSuccess,
    });

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
                <Link
                    className={buttonVariants({variant: "link"})}
                    to={`/admin/showings/edit/${slug}`}
                >
                    Edit
                </Link>

                <Button
                    variant="link"
                    onClick={() => mutate({_id})}
                    disabled={isPending || isSuccess}
                    className="disabled:text-neutral-400"
                >
                    {isPending || isSuccess
                        ? <Loader className="animate-spin"/>
                        : "Delete"}
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default ShowingOptions;
