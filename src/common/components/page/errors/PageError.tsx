import {FC} from 'react';
import {ParseError} from "@/common/errors/ParseError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import useHttpResponseErrorHandler from "@/common/hooks/errors/useHttpResponseErrorHandler.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {Link, To} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";

interface Props {
    header?: string;
    message?: string;
    error?: Error | ParseError | HttpResponseError | null;
    to?: To;
    linkText?: string;
}

const PageError: FC<Props> = ({error, message, header = "ERROR", to, linkText}) => {
    useHttpResponseErrorHandler(error);

    return (
        <PageCenter className="space-y-2">
            <h1 className="dotgothic16-regular text-[100px]">{header}</h1>
            <h2 className="text-neutral-500">{message || error?.message || "Unknown Error"}</h2>

            {
                to && <Link to={to!} className={cn(
                    buttonVariants({variant: "link"}),
                    "text-neutral-400 hover:text-black"
                )}>
                    {linkText || "Link"}
                </Link>
            }
        </PageCenter>
    );
};

export default PageError;
