import {FC} from 'react';
import ErrorSpan from "@/common/components/errors/ErrorSpan.tsx";
import {cn} from "@/common/lib/utils.ts";

interface ContainerProps {
    error: Error;
    message?: string;
    containerCSS?: string;
    spanCSS?: string;
}

const ErrorSpanContainer: FC<ContainerProps> = ({error, message, containerCSS, spanCSS}) => {
    return (
        <div className={cn("flex justify-center items-center", containerCSS)}>
            <ErrorSpan error={error} message={message} className={spanCSS} />
        </div>
    );
};

export default ErrorSpanContainer;
