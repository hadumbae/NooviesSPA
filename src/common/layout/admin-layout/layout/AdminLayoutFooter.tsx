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
        <footer className="font-mono text-center text-neutral-500">
            <span className="text-xs lg:text-sm">
                All Rights Reserved <b>@ {currentYear}</b> | Noovies Ltd.
            </span>
        </footer>
    );
};

export default AdminLayoutFooter;
