import filterNullAttributes from "@/common/utility/filterNullAttributes.ts";

interface IBuildQueryURL {
    baseURL: string;
    path: string;
    queries?: Record<string, any>;
}

export default function buildQueryURL ({baseURL, path, queries}: IBuildQueryURL): string {
    const url = new URL(`${baseURL}/${path}`);

    if (queries) {
        const filteredQueries = filterNullAttributes(queries);

        Object.keys(filteredQueries).forEach((key: string) => {
            if (filteredQueries[key] !== undefined) {
                url.searchParams.append(key, JSON.stringify(queries[key]));
            }
        });
    }

    return url.toString();
}