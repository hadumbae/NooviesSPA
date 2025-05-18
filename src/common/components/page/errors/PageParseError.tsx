import {FC} from 'react';
import {ParseError} from "@/common/errors/ParseError.ts";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {TriangleAlert} from "lucide-react";

/**
 * Props for the `PageParseError` component.
 *
 * This interface defines the optional values used to customize the parse error display.
 */
interface ParseProps {
    /**
     * Optional header text to override the default title.
     */
    header?: string;

    /**
     * Optional message text to override the default description.
     */
    message?: string;

    /**
     * The error object to display. If not a `ParseError`, the fallback `PageError` will be shown.
     */
    error?: Error | ParseError | HttpResponseError | null;
}

/**
 * `PageParseError` is a UI component that displays structured information
 * about data parsing errors (typically from schema validation).
 *
 * If the provided error is not an instance of `ParseError`, it falls back to rendering a generic `PageError`.
 *
 * This component is intended for use in full-page error displays.
 *
 * @param params - Object containing optional `header`, `message`, and `error`.
 * @returns A React element that visually represents the parse error.
 */
const PageParseError: FC<ParseProps> = (params) => {
    const {header, message, error} = params;
    if (!error || !(error instanceof ParseError)) return <PageError {...params} />

    const {errors} = error;
    const headerText = header || "Failed To Parse Data";
    const messageText = message || "Received Invalid Data";

    return (
        <PageCenter className="space-y-6">
            <TriangleAlert className="text-neutral-500"/>

            <section className="space-y-2">
                <h1 className="dotgothic16-regular text-[100px]">{headerText}</h1>
                <h2 className="text-neutral-500">{messageText}</h2>
            </section>

            <ol className="list-disc text-sm text-neutral-400">
                {errors.map((e) => <li key={`${e.path.join(".")}-${e.message}`}>
                    [{e.path.join(".")}] {e.message}
                </li>)}
            </ol>
        </PageCenter>
    );
};

export default PageParseError;
