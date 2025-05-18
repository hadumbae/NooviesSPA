import {FC} from 'react';
import {TriangleAlert} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    error: Error;
    message?: string;
    className?: string;
}

const ErrorSpan: FC<Props> = ({error, message, className}) => {
    const errorMessage = message || error.message || "Something went wrong.";

    return (
        <span className={cn("text-red-500", className)}>
            <TriangleAlert /> {errorMessage}
        </span>
    );
};

export default ErrorSpan;
