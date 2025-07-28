import {ParseError} from "@/common/errors/ParseError.ts";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import PageError from "@/common/components/page/errors/PageError.tsx";
import {TriangleAlert} from "lucide-react";
import {ZodIssue} from "zod";

/**
 * Props for the {@link PageParseError} component.
 */
type ParseProps = {
    /**
     * Optional header text displayed above the error details.
     * Defaults to `"Failed To Validate Data"`.
     */
    header?: string;

    /**
     * Optional message displayed below the header.
     * Defaults to `"Received Invalid Data"`.
     */
    message?: string;

    /**
     * The parse error instance containing validation issues and raw data.
     * If the provided error is not a {@link ParseError}, the component will
     * fall back to rendering {@link PageError}.
     */
    error: ParseError;
}

/**
 * A page-level error display for failed schema validation.
 *
 * This component:
 * - Falls back to {@link PageError} if the provided error is not a {@link ParseError}.
 * - Displays a warning icon, header, and message.
 * - Lists validation issues from the associated {@link ParseError}.
 * - Logs raw data and issues to the console for debugging.
 *
 * @param params - See {@link ParseProps}.
 *
 * @returns A centered page error view with validation details.
 *
 * @example
 * ```tsx
 * try {
 *   // some data validation logic...
 * } catch (err) {
 *   if (err instanceof ParseError) {
 *     return <PageParseError error={err} />;
 *   }
 * }
 * ```
 */
const PageParseError = (params: ParseProps) => {
    const {header, message, error} = params;

    if (!error || !(error instanceof ParseError)) {
        return <PageError {...params} />;
    }

    const {errors, raw} = error;
    const headerText = header || "Failed To Validate Data";
    const messageText = message || "Received Invalid Data";

    console.error("Failed To Parse Data:");
    console.error("Raw: ", raw);
    console.error("Issues: ", error.errors);

    const issueMap = (e: ZodIssue) => (
        <li key={`${e.path.join(".")}-${e.message}`}>
            [{e.path.join(".")}] {e.message}
        </li>
    );

    return (
        <PageCenter className="space-y-6">
            <TriangleAlert className="text-neutral-500" size={100}/>

            <section className="flex flex-col justify-center items-center space-y-2">
                <h1 className="dotgothic16-regular text-3xl">{headerText}</h1>
                <h2 className="text-neutral-500">{messageText}</h2>
            </section>

            <ol className="list-disc text-sm text-neutral-400">
                {errors.map(issueMap)}
            </ol>
        </PageCenter>
    );
};

export default PageParseError;
