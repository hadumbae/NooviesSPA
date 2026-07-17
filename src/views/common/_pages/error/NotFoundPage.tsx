/**
 * @fileoverview Page component displayed when a user navigates to a non-existent route.
 */

import {ReactElement} from 'react';
import {PageCenter} from "@/views/common/_comp/page";

/** A fallback page displaying a 404 error message. */
export function NotFoundPage(): ReactElement {
    return (
        <PageCenter className="space-y-5">
            <h1 className="font-dotGothic16 text-[100px]">
                404
            </h1>

            <h2 className="text-neutral-500">
                Requested route not found.
            </h2>
        </PageCenter>
    );
}
