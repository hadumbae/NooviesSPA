interface IBuildQueryURL {
    baseURL: string;
    path: string;
    queries?: Record<string, any>;
}

export default function buildQueryURL ({baseURL, path, queries}: IBuildQueryURL): string {
    const url = new URL(`${baseURL}/${path}`);

    if (queries) {
        Object.keys(queries).forEach((key: string) => {
            if (queries[key] !== undefined) url.searchParams.append(key, String(queries[key]));
        });
    }

    return url.toString();
}