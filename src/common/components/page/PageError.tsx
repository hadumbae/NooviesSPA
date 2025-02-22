import {FC} from 'react';
import {ParseError} from "@/common/errors/ParseError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useHttpResponseErrorHandler from "@/common/hooks/errors/useHttpResponseErrorHandler.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";

interface Props {
    header?: string;
    message?: string;
    error?: Error | ParseError | HttpResponseError | null
}

const PageError: FC<Props> = ({error, message, header = "ERROR"}) => {
    useHttpResponseErrorHandler(error);

    return (
        <PageCenter>
            <h1 className="dotgothic16-regular text-[100px]">
                {header}
            </h1>

            <h2 className="text-neutral-500">
                {message || error?.message || "Unknown Error"}
            </h2>
        </PageCenter>
    );
};

export default PageError;
