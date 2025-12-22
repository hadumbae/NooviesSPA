import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Plus} from "lucide-react";
import {MutationOnSubmitParams} from "@/common/type/form/MutationSubmitParams.ts";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";
import {Button} from "@/common/components/ui/button.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import TheatreSubmitFormPanel
    from "@/pages/theatres/components/admin/form/theatre-submit-form/TheatreSubmitFormPanel.tsx";

/**
 * Props for {@link TheatreIndexHeader}.
 *
 * These props follow the {@link MutationOnSubmitParams} contract and configure
 * how theatre creation behaves when the form inside {@link TheatreSubmitFormPanel}
 * is submitted.
 *
 * @template Theatre - The type of the created theatre data.
 *
 * @property validationSchema
 *   Optional Zod schema used to validate form data before submission.
 *
 * @property successMessage
 *   Optional message to display after a successful theatre creation.
 *
 * @property onSubmitSuccess
 *   Callback invoked after the theatre is successfully created.
 *   Receives the newly created `Theatre` object.
 *
 * @property errorMessage
 *   Optional message to display when creation fails.
 *
 * @property onSubmitError
 *   Callback invoked if the mutation fails.
 *   Receives the error thrown during submission.
 */
type HeaderProps = MutationOnSubmitParams<Theatre>;

/**
 * Header component for the Theatres Index page.
 *
 * Displays:
 * - The page title ("Theatres")
 * - A helpful description
 * - A **Create** button that opens a theatre creation form inside
 *   {@link TheatreSubmitFormPanel}.
 *
 * This component **does not manage form state itself**.
 * All submission-related behavior (validation, messages, callbacks)
 * is forwarded directly to the underlying form panel through the props.
 *
 * @param props - Form submission configuration controlling validation,
 *                mutation messages, and callbacks.
 *
 * @example
 * ```tsx
 * <TheatreIndexHeader
 *   validationSchema={theatreSchema}
 *   successMessage="Theatre created!"
 *   onSubmitSuccess={(t) => console.log("Created:", t)}
 *   errorMessage="Failed to create theatre."
 * />
 * ```
 */
const TheatreIndexHeader: FC<HeaderProps> = (props) => {
    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>Theatres</HeaderTitle>
                <HeaderDescription>
                    The theatres where the movies will be shown.
                </HeaderDescription>
            </section>

            <TheatreSubmitFormPanel {...props}>
                <Button
                    variant="link"
                    size="sm"
                    className={HoverLinkCSS}
                >
                    <Plus/> Create
                </Button>
            </TheatreSubmitFormPanel>
        </header>
    );
};

export default TheatreIndexHeader;
