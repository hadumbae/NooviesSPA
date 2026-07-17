/**
 * @fileoverview Error page component for displaying generic application failures.
 */

import {ReactElement} from 'react';
import {PageCenter} from "@/views/common/_comp/page";

/** A centered layout page displaying a generic error message. */
export function ErrorPage(): ReactElement {
    return (
        <PageCenter className="space-y-5">
            <h1 className="font-dotGothic16 text-[100px]">
                ERROR
            </h1>

            <h2 className="text-neutral-500">
                Oops, Something Went Wrong!
            </h2>
        </PageCenter>
    );
}
