import filterEmptyAttributes from "@/common/utility/filterEmptyAttributes.ts";

interface IBuildQueryURL {
    baseURL: string;
    path: string;
    queries?: Record<string, any>;
}

export default function buildQueryURL ({baseURL, path, queries}: IBuildQueryURL): string {
    const url = new URL(`${baseURL}/${path}`);

    if (queries) {
        const filteredQueries = filterEmptyAttributes(queries);

        Object.keys(filteredQueries).forEach((key: string) => {
            if (filteredQueries[key] !== undefined) {
                url.searchParams.append(key, JSON.stringify(queries[key]));
            }
        });
    }

    return url.toString();
}