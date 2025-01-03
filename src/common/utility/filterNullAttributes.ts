export default  function filterNullAttributes(data: Record<string, any>) {
    const keys: string[] = Object.keys(data);
    return keys.reduce(
        (obj: Record<string, any>, key: string) =>
            data[key] ? {...obj, [key]: data[key]} : obj,
        {}
    );
}