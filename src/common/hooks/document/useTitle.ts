import {useEffect} from "react";

export default function useTitle(title?: string | null) {
    useEffect(() => {
        const docTitle = `Noovies | ${title}`;

        if (title && document.title !== docTitle) {
            document.title = docTitle;
        }
    }, [title]);
}