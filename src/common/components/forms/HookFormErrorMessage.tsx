import {FC} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {FieldError} from "react-hook-form";

interface Props {
    error?: FieldError;
    className?: string;
}

const HookFormErrorMessage: FC<Props> = ({error, className}) => {
    return (
        <p className={cn("text-[0.8rem] font-medium text-red-500 dark:text-red-900", className)}>
            {error && error.message}
        </p>
    );
};

export default HookFormErrorMessage;
