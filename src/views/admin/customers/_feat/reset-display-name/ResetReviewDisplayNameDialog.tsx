/**
 * @fileoverview Dialog component for the administrative Reset Display Name action.
 */

import {useFormContext} from "react-hook-form";
import {ReactElement, ReactNode} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {useBaseFormContext} from "@/common/_feat/generic-form-context";
import {HookFormInput} from "@/views/common/_feat";
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui";

/** Props for the ResetReviewDisplayNameDialog component. */
export type DialogProps = {
    children?: ReactNode;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    className?: string;
};

/**
 * Interface for administrators to modify a review author's display name.
 */
export function ResetReviewDisplayNameDialog(
    {children, isOpen, setIsOpen, className}: DialogProps
): ReactElement {
    const {formID} = useBaseFormContext();
    const {control} = useFormContext();

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-2">
                <DialogHeader>
                    <DialogTitle>Reset Review's Display Name</DialogTitle>
                    <DialogDescription>
                        Modify the review's display name and provide a moderation reason.
                        This action cannot be reversed.
                    </DialogDescription>
                </DialogHeader>

                <div className={cn("space-y-2", className)}>
                    <HookFormInput
                        type="text"
                        label="Display Name"
                        name="displayName"
                        control={control}
                        placeholder="e.g. John Doe"
                    />

                    <HookFormInput
                        type="text"
                        label="Moderation Message"
                        name="message"
                        control={control}
                        placeholder="Reason for name reset..."
                    />
                </div>

                <DialogFooter className="max-md:gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button
                        form={formID}
                        variant="primary"
                        type="submit"
                    >
                        Reset
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}