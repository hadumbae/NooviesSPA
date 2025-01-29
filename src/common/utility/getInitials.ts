export default (sentence: string) => {
    return sentence.split(" ").map(word => word[0]).join("");
}