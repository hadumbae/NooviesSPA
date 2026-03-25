import {FC} from 'react';

/**
 * Admin layout footer.
 *
 * @remarks
 * - Displays current year dynamically
 * - Intended for use at the bottom of the admin layout
 */
const AdminLayoutFooter: FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="font-dotGothic16 text-center text-neutral-500">
            <span className="text-sm">
                All Rights Reserved <span className="font-bold">@{currentYear}</span> | Noovies Ltd.
            </span>
        </footer>
    );
};

export default AdminLayoutFooter;
