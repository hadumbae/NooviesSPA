import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {Theatre} from "@/pages/theatres/schema/theatre/Theatre.types.ts";

/**
 * Props for {@link TheatreDetailsHeader}.
 */
type HeaderProps = {
    /** Theatre object containing details to display in the header */
    theatre: Theatre;
}

/**
 * Header component for displaying theatre details.
 *
 * Shows the theatre's name as a title and a subtitle description.
 * Designed to handle responsive layouts for mobile and desktop.
 *
 * @remarks
 * The right section of the header (action buttons) is currently empty
 * and can be populated with edit/delete actions, e.g., using
 * {@link TheatreSubmitFormPanel} or {@link TheatreDeleteWarningDialog}.
 *
 * @example
 * <TheatreDetailsHeader theatre={theatre} />
 */
const TheatreDetailsHeader: FC<HeaderProps> = ({theatre}) => {
    const {name} = theatre;

    return (
        <header className="flex justify-between items-center">
            <section>
                <HeaderTitle>{name}</HeaderTitle>
                <HeaderDescription>Theatre</HeaderDescription>
            </section>

            {/* Options Component To Add Later */}
        </header>
    );
};

export default TheatreDetailsHeader;
