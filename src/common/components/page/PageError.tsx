import {FC} from 'react';
import {FetchError} from "@/common/errors/FetchError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useHttpResponseErrorHandler from "@/common/hooks/errors/useHttpResponseErrorHandler.ts";

interface Props {
    header?: string;
    message?: string;
    error?: Error | FetchError | HttpResponseError | null
}

const PageError: FC<Props> = ({error, message, header = "ERROR"}) => {
    useHttpResponseErrorHandler(error);

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h1 className="dotgothic16-regular text-[100px]">
                {header}
            </h1>

            <h2 className="text-neutral-500">
                {message || error?.message || "Unknown Error"}
            </h2>
        </div>
    );
};

export default PageError;
