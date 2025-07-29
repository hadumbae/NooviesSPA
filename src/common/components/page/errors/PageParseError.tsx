import {ParseError} from "@/common/errors/ParseError.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {TriangleAlert} from "lucide-react";
import {ZodIssue} from "zod";
import HttpResponseError from "@/common/errors/HttpResponseError.ts";
import PageHTTPError from "@/common/components/page/errors/PageHTTPError.tsx";

/**
 * Props for {@link PageParseError}.
 */
type ParseProps = {
    /**
     * Optional custom header to display above the error message.
     * Defaults to `"Failed To Validate Data"` if not provided.
     */
    header?: string;

    /**
     * Optional custom message to display under the header.
     * Defaults to `"Received Invalid Data"` if not provided.
     */
    message?: string;

    /**
     * The error that triggered this page.
     * Ideally, this should be a {@link ParseError},
     * but {@link HttpResponseError} or a generic `Error` (or `null`)
     * are accepted for flexibility.
     *
     * - If the error is a `ParseError`, a validation details view is rendered.
     * - If the error is an `HttpResponseError`, rendering falls back to {@link PageHTTPError}.
     * - For all other errors, rendering falls back to {@link PageError}.
     */
    error: ParseError | HttpResponseError | Error | null;
};

/**
 * A page-level component for rendering parsing/validation errors.
 *
 * - When provided with a {@link ParseError}, it displays a structured
 *   list of validation issues (`ZodIssue[]`) along with optional header/message.
 * - When provided with a {@link HttpResponseError}, it delegates to {@link PageHTTPError}.
 * - When provided with any other `Error` (or `null`), it falls back to {@link PageError}.
 *
 * This component is primarily used to surface errors from schema validation (Zod)
 * when parsing server responses or API data.
 *
 * @example
 * ```tsx
 * <PageParseError error={new ParseError({ errors: zodIssues, raw: rawData })} />
 *
 * <PageParseError
 *   header="Custom Parse Error"
 *   message="The data format was unexpected."
 *   error={null}
 * />
 * ```
 */
const PageParseError = (params: ParseProps) => {
    const {header, message, error} = params;

    if (!error || !(error instanceof ParseError)) {
        return error instanceof HttpResponseError
            ? <PageHTTPError {...params} />
            : <PageError {...params} />;
    }

    const {errors, raw} = error;
    const headerText = header || "Failed To Validate Data";
    const messageText = message || "Received Invalid Data";

    console.error("Failed To Parse Data:");
    console.error("Raw: ", raw);
    console.error("Issues: ", error.errors);

    return (
        <PageCenter className="space-y-6">
            <TriangleAlert className="text-neutral-500" size={100}/>

            <section className="flex flex-col justify-center items-center space-y-2">
                <h1 className="dotgothic16-regular text-3xl">{headerText}</h1>
                <h2 className="text-neutral-500">{messageText}</h2>
            </section>

            <ol className="list-disc text-sm text-neutral-400">
                {errors.map((e: ZodIssue) =>
                    <li key={`${e.path.join(".")}-${e.message}`}>
                        [{e.path.join(".")}] {e.message}
                    </li>
                )}
            </ol>
        </PageCenter>
    );
};

export default PageParseError;
