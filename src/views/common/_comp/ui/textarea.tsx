import {type ComponentProps, forwardRef} from "react"
import {cn} from "@/common/_feat/handle-ui/cn"

const Textarea = forwardRef<
    HTMLTextAreaElement,
    ComponentProps<"textarea">
>(({className, ...props}, ref) => {
    return (
        <textarea
            className={cn("default-textarea", className)}
            ref={ref}
            {...props}
        />
    )
});

Textarea.displayName = "Textarea"

export {Textarea}
