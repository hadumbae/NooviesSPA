export default (obj: Record<string, any> | string | undefined): string | undefined => {
    if (typeof obj === "object" && "_id" in obj) {
        return (obj as {_id: string})._id;
    }

    return obj as string | undefined;
}