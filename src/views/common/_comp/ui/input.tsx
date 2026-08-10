import {forwardRef, type ComponentProps} from "react"

import {cn} from "@/common/_feat/handle-ui/cn"

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
    ({className, type, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn("default-input", className)}
                ref={ref}
                {...props}
            />
        )
    }
);

Input.displayName = "Input"

export {Input}
